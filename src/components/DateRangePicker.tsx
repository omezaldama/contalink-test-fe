import type React from 'react';

export interface DateRangePickerProps {
  fromDate: string;
  toDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
  updateInvoices: () => void;
};

const DateRangePicker = ({fromDate, setFromDate, toDate, setToDate, updateInvoices}: DateRangePickerProps) => {
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
          onClick={updateInvoices}
        >Get invoices</button>
      </div>
    </>
  );
};

export default DateRangePicker;
