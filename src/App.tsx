import { useState } from 'react';
import type { Invoice } from './schemas/invoice-schemas';
import HttpService from './services/http-service';
import DateRangePicker from './components/DateRangePicker';
import InvoicesTable from './components/InvoicesTable';

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
        <DateRangePicker
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          updateInvoices={updateInvoicesAndDates}
        ></DateRangePicker>
      </div>
      <div>
        {
          (Boolean(submittedFromDate.length) && Boolean(submittedToDate.length))
          ? <div>
            <InvoicesTable
              invoices={invoices}
              submittedFromDate={submittedFromDate}
              submittedToDate={submittedToDate}
            ></InvoicesTable>
          </div>
          : <div>
            Select some dates and click the button
          </div>
        }
      </div>
    </>
  )
}

export default App;
