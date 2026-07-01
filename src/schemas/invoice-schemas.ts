export interface Invoice {
  id: number;
  invoice_number: string;
  total: number;
  invoice_date: Date;
  status: string;
  active: boolean;
};
