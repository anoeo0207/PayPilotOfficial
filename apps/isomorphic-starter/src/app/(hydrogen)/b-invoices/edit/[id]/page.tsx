import EditInvoiceForm from '@/app/shared/invoice/invoice-list/edit-invoice';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/action';
import { notFound } from 'next/navigation';
import React from 'react';

export type PageParams = Promise<{ id: string }>;

export default async function Page(props: { params: PageParams }) {
  const { id } = await props.params;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}
