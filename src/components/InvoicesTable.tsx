import type { Invoice } from '../schemas/invoice-schemas';

export interface InvoicesTableProps {
  invoices: Invoice[];
  submittedFromDate: string;
  submittedToDate: string;
};

const InvoicesTable = ({invoices, submittedFromDate, submittedToDate}: InvoicesTableProps) => {
  return (
    <>
      <h3>Showing invoices from {submittedFromDate} upto {submittedToDate}</h3>
        <table className="invoices-table">
          <tr>
            <th>Invoice number</th>
            <th>Is active</th>
            <th>Amount</th>
          </tr>
          {
            invoices.length > 0 ? invoices.map((invoice) => (
              <tr>
                <th>{invoice.invoice_number}</th>
                <td>{invoice.active ? 'Active' : 'Inactive'}</td>
                <td className="right-align">$ {invoice.total.toFixed(2)}</td>
              </tr>
            )) : 'No invoices for this date range'
          }
        </table>
    </>
  );
};

export default InvoicesTable;
