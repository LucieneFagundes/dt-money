import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

export const Transactions = () => {
  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>31/01/2024</td>
            </tr>
            <tr>
              <td width="50%">Holly Chuck</td>
              <td>
                <PriceHighlight variant="outcome">- R$ 89,90</PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>15/02/2024</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  );
};
