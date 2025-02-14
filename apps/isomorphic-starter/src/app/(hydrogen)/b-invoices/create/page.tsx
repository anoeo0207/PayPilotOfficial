import AddInvoiceForm from '@/app/shared/invoice/create-invoice';
import { fetchCustomers } from '@/app/lib/action';
import { Metadata} from 'next';
import React from 'react';
import { routes} from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

export const metadata: Metadata = {
  title: 'Create Invoices',
};

const pageHeader = {
  title: 'Create Invoice',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoice',
    },
    {
      name: 'Create',
    },
  ],
};
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <AddInvoiceForm customers={customers} />
    </main>
  );
}