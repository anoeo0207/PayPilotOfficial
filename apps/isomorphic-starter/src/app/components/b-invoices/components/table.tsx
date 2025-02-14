import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import TableLayout from '../../table-layout';
import { metaObject } from '@/config/site.config';
import { fetchInvoices } from '@/app/lib/data';

export const metadata = {
  ...metaObject('Invoice List'),
};

const pageHeader = {
  title: 'Invoices List',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Invoices',
    },
    {
      name: 'List',
    },
  ],
};

export default async function  InvoiceTable() {
  const invoices = await fetchInvoices();
  
  // const test = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  // const data = await test.json();
  return (
    // <TableLayout
    //   title={pageHeader.title}
    //   breadcrumb={pageHeader.breadcrumb}
    //   data={invoices}
    //   fileName="Invoice List"
    //   header="Name,Email,Avatar,Amount,Created At,Status"
    // >
      <BasicTableWidget
        title="Invoices Table"
        variant="minimal"
        data={invoices}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination
        searchPlaceholder="Search invoices..."
        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />
    // </TableLayout>
  );
}
