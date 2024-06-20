import React, { createContext } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const { data } = await api.get("/transactions");

    const filteredTransactions = data
      .filter((transaction: Transaction) => {
        if (!query) return true;
        return (
          transaction.description.toLowerCase().includes(query.toLowerCase()) ||
          transaction.category.toLowerCase().includes(query.toLowerCase())
        );
      })
      .sort((a: Transaction, b: Transaction) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (dateA > dateB) return -1;
      });

    setTransactions(filteredTransactions);
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data;

    await api.post("/transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date().toISOString(),
    });
  }

  React.useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
