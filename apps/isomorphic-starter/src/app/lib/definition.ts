import { LoaderTree } from "next/dist/server/lib/app-dir-module";
import { Country } from "./country";

export type LatestInvoice = {
    id: string;
    name: string;
    image_url: string;
    email: string;
    amount: string;
  };

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
    amount: number;
};

export type Revenue = {
    month: string;
    revenue: number;
};

export type TotalMoney = {
    customer_id: string;
    name: string;
    image_url: string;
    email: string;
    phone_number: string;
    address: string;
    total_amount: number;
    total_money_paid: number;
    total_money_pending: number;
  };

  export type InvoicesTable = {
    id: string;
    customer_id: string;
    name: string;
    email: string;
    image_url: string;
    date: string;
    amount: number;
    status: 'Pending' | 'Paid';
  };

  export type CreateNewInvoice = {
    id: string;
    customer_id: string;
    name: string;
    image_url: string;
    amount: number;
    status: 'Pending' | 'Paid';
  };

  export enum Ranking {
    Bronze = "bronze",
    Silver = "silver",
    Gold = "gold",
    Diamond = "diamond",
  }
  
  export type CustomerField = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    phone_number: string;
    address: string;
    date_of_birth: string;
    ranking: string;
    country: string;
  };

  export type InvoiceForm = {
    id: string;
    customer_id: string;
    status: 'pending' | 'paid';
    note: string;
    amount: number;
    surcharge: number;
    taxes: number;
    initial_amount: number | "No data";
    date: Date;
  };

  export type CustomerLastestInvoice = {
    id : string;
    customer_id :string;
    amount: string;
    status : 'pending' | 'paid';
    date: Date;
  };

  export type getTotal = {
    totalMoney: number;
    totalPaid : number;
    totalPending: number;
  };
  
  export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };