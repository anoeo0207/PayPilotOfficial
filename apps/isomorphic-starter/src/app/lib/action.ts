'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CustomerField, InvoiceForm, TotalMoney, CustomerLastestInvoice} from './definition';
import { Country } from './country';
import { signIn } from 'auth';
import { AuthError } from 'next-auth';

export type DataForm = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
    image?: string[];
    country?: string[];
    birth?: string[];
  };
  message?: string | null;
};

const AddCustomerSchema = z.object({
  name: z.string().min(2, "Name is required"), 
  email: z.string().email("Invalid email format"),
  phone: z.string().min(9, "Invalid phone number format"),
  address: z.string(),
  image: z.string().url("Invalid URL format"),
  country: z.string(),
  birth: z.string(),
});

export async function AddCustomer(prevState: DataForm, formData: FormData) {
  const validatedFields = AddCustomerSchema.safeParse({
    name: formData.get('customer-name') || '',
    email: formData.get('customer-email') || '',
    phone: formData.get('customer-phone') || '',
    address: formData.get('customer-address') || '',
    image: formData.get('customer-image') || '',
    country: formData.get('customer-country') || '',
    birth: formData.get('customer-birth') || '',
  });  

  console.log ({
    name: formData.get('customer-name') || '',
    email: formData.get('customer-email') || '',
    phone: formData.get('customer-phone') || '',
    address: formData.get('customer-address') || '',
    image: formData.get('customer-image') || '',
    country: formData.get('customer-country'),
    birth: formData.get('customer-birth'),
  })

  if (!validatedFields.success) {
    console.log('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }
  
 
  // Prepare data for insertion into the database
  const { name, email, phone, image, address, country, birth} = validatedFields.data;
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO customers (name, email, image_url, phone_number, address, country, date_of_birth)
      VALUES (${name}, ${email}, ${image}, ${phone}, ${address}, ${country}, ${birth})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/c-customers');
  redirect('/c-customers');
}


const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  note: z.string(),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  taxes: z.coerce
    .number()
  ,
  initialAmount: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' })
,
  surcharge: z.coerce
  .number()
,
  date: z.coerce
  .number()
,
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const rawAmount = formData.get('totalMoney')?.toString() || '';
  const sanitizedAmount = parseFloat(rawAmount.replace(/[^0-9.-]+/g, ''));
  
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    note: formData.get('note'),
    status: formData.get('status'),
    amount: sanitizedAmount,
    taxes: parseFloat(formData.get('taxes')?.toString() || '0'),  
    surcharge: parseFloat(formData.get('surcharge')?.toString() || '0'),  
    initialAmount: parseFloat(formData.get('initialAmount')?.toString() || '0'),
  });
  //If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status, note, taxes, surcharge, initialAmount } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  
  // Insert data into the database
  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date, note, taxes, surcharge, initial_amount)
    VALUES (${customerId}, ${amount}, ${status}, ${date}, ${note}, ${taxes}, ${surcharge}, ${initialAmount} )
`;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/b-invoices');
  redirect('/b-invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const rawAmount = formData.get('totalMoney')?.toString() || '';
  const sanitizedAmount = parseFloat(rawAmount.replace(/[^0-9.-]+/g, ''));

  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    note: formData.get('note'),
    status: formData.get('status'),
    amount: sanitizedAmount,
    taxes: parseFloat(formData.get('taxes')?.toString() || '0'),  
    surcharge: parseFloat(formData.get('surcharge')?.toString() || '0'),  
    initialAmount: parseFloat(formData.get('initialAmount')?.toString() || '0'),
  });
 
  if (!validatedFields.success) {
    console.log("Error at: "+ validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, note, amount, status, taxes, surcharge, initialAmount  } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}, note = ${note}, taxes = ${taxes}, surcharge = ${surcharge},
      initial_amount = ${initialAmount}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Update Error:", error);
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
  revalidatePath('/b-invoices');
  redirect('/b-invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/b-invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function deleteCustomer(id: string) {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    await sql`DELETE FROM invoices i WHERE i.customer_id = ${id}`;
    revalidatePath('/c-customers'); 
}

export async function deleteSystem() {
  try {
    await sql`
      DELETE FROM invoices
    `;
    revalidatePath('/dashboard/acme');
    return { message: 'Deleted successfully.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export type State = {
  errors?: {
    customerId?: string[];
    note?: string[];
    status?: string[];
    amount?: string[];
    taxes?: string[];
    initialAmount?: string[];
    surcharge?: string[];
  };
  message?: string | null;
};

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name,
        email,
        image_url,
        phone_number,
        address
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
    invoices.id,
    invoices.customer_id,
    invoices.status,
    invoices.note,
    invoices.amount,
    invoices.surcharge,
    invoices.taxes,
    invoices.initial_amount,
    invoices.date
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows;
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchTotalMoney(id: string) {
  try {
    const data = await sql<TotalMoney>`
      SELECT 
        ${id} AS customer_id,
        COALESCE(SUM(amount), 0) AS total_amount,  
        COALESCE(SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END), 0) AS total_money_paid,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) AS total_money_pending  
      FROM invoices
      WHERE invoices.customer_id = ${id};

    `;
    const res = data.rows;
    return res;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices data.');
  }
}

export async function fetchCustomersById(id : string) {

  if (id === 'null') {
    throw new Error('Invalid or missing customer ID.');
  }

  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name,
        email,
        image_url,
        phone_number,
        address, 
        date_of_birth,
        ranking,
        country
      FROM customers
      WHERE id = ${id}
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchCustomerLastestInvoices(id : string) {
    try {
      const data = await sql<CustomerLastestInvoice>`
        SELECT invoices.id, invoices.customer_id, invoices.amount, invoices.status, invoices.date
        FROM invoices
        WHERE invoices.customer_id = ${id}
        ORDER BY invoices.date DESC
        LIMIT 7`;
  
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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}