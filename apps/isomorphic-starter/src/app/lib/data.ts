import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import {
  LatestInvoiceRaw,
  InvoicesTable,
  TotalMoney,
  Revenue
} from './definition';
import { formatCurrency } from './utils';
import { redirect } from 'next/navigation';
import z from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function fetchLatestInvoices() {
    try {
      const data = await sql<LatestInvoiceRaw>`
        SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT 5`;
  
      const latestInvoices = data.rows.map((invoice) => ({
        ...invoice,
        amount: invoice.amount,
      }));
      return latestInvoices;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the latest invoices.');
    }
  }
  
  export async function fetchCardData() {
    try {
      const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
      const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
      const invoiceStatusPromise = sql`SELECT
           SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
           SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
           FROM invoices`;
  
      const data = await Promise.all([
        invoiceCountPromise,
        customerCountPromise,
        invoiceStatusPromise,
      ]);
  
      const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
      const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
      const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
      const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
  
      return {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch card data.');
    }
  }

  export async function fetchTotalMoney(): Promise<TotalMoney[]> {
    try {
      const data = await sql<TotalMoney>`
        SELECT 
          c.id,
          c.name,
          c.image_url,
          c.email,
          c.phone_number,
          c.address,
          COALESCE(SUM(i.amount), 0) AS total_amount,
          COALESCE(SUM(CASE WHEN i.status = 'paid' THEN i.amount ELSE 0 END), 0) AS total_money_paid,
          COALESCE(SUM(CASE WHEN i.status = 'pending' THEN i.amount ELSE 0 END), 0) AS total_money_pending
        FROM customers c
        LEFT JOIN invoices i  ON c.id = i.customer_id
        GROUP BY c.id, c.name, c.image_url, c.email, c.phone_number, c.address
      `;

      const res = data.rows;
      return res;  // Trả về kết quả
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch customers data.');
    }
  }

  export async function fetchInvoices() {
  
    try {
      const invoices = await sql<InvoicesTable>`
        SELECT
          invoices.id,
          invoices.amount,
          invoices.date,
          invoices.status,
          customers.name,
          customers.email,
          customers.image_url
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
      `;
  
      return invoices.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch invoices.');
    }
  }

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
}

export type DataForm = {
  errors?: {
    name?: string[];
    email?: string[];
    image?: string[];
  };
  message?: string | null;
};

export async function fetchRevenue() {
  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.' + error);
  }
}

interface getTotal {
  totalMoney: number;
  totalPaid: number;
  totalPending: number;
}

export async function getTotalMoney() {
  try {
    const data = await sql<getTotal>`
      SELECT 
        SUM(amount) AS totalMoney,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS totalPaid,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS totalPending
      FROM invoices;
    `;
    return data.rows; 

  } catch (error) {
  
    return { message: 'Database Error: Failed to Get Total Paid and Pending.' };
  }
}

