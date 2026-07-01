import React, { useState } from 'react';
import type { Invoice } from './schemas/invoice-schemas';
import HttpService from './services/http-service';

const httpClient = new HttpService();

function App() {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [submittedFromDate, setSubmittedFromDate] = useState<string>('');
  const [submittedToDate, setSubmittedToDate] = useState<string>('');
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const updateInvoicesAndDates = async () => {
    const response = await httpClient.get<{ invoices: Invoice[] }>(
      `invoices?from_date=${fromDate}&to_date=${toDate}`
    );
    setInvoices(response.invoices);
    setSubmittedFromDate(fromDate);
    setSubmittedToDate(toDate);
  };

  return (
    <>
      <div>
        <label htmlFor="from-date">From:</label>
        <input
          id="from-date"
          type="date"
          value={fromDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromDate(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="to-date">Upto:</label>
        <input
          id="to-date"
          type="date"
          value={toDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToDate(e.target.value)}
        ></input>
      </div>
      <div>
        <button
          disabled={!Boolean(fromDate.length) || !Boolean(toDate.length)}
          type="button"
          onClick={updateInvoicesAndDates}
        >Get invoices</button>
      </div>
      <div>
        {
          (Boolean(submittedFromDate.length) && Boolean(submittedToDate.length)) ? <div>
            <h3>Showing invoices from {submittedFromDate} upto {submittedToDate}</h3>
            <table className="invoices-table">
              <tr>
                <th>Invoice number</th>
                <th>Is active</th>
                <th>Amount</th>
              </tr>
              {
                invoices.length > 0 ? invoices.map((invoice: Invoice) => (
                  <tr>
                    <th>{invoice.invoice_number}</th>
                    <td>{invoice.active ? 'Active' : 'Inactive'}</td>
                    <td className="right-align">$ {invoice.total.toFixed(2)}</td>
                  </tr>
                )) : 'No invoices for this date range'
              }
            </table>
          </div>
          : <div>Select some dates and click the button</div>
        }
      </div>
    </>
  )
}

export default App;
