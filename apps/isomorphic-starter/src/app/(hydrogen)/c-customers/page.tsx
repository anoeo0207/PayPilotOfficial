import { routes } from '@/config/routes';
import { getColumns } from '@/app/shared/ecommerce/order/order-list/columns-customer-table';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import { metaObject } from '@/config/site.config';
import { fetchTotalMoney } from '@/app/lib/data';

export const metadata = {
  ...metaObject('Table with search'),
};

const pageHeader = {
  title: 'Search Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Customers',
    },
    {
      name: 'List',
    },
  ],
};

export default async function SearchTablePage() {
  const tests = await fetchTotalMoney();

  return (
    // <TableLayout
    //   title="Customer List"
    //   breadcrumb={pageHeader.breadcrumb}
    //   data={tests}
    //   fileName="customer-list"
    //   header="Name,Email,Avatar,Status,Created At,Updated At"
    // >
      <BasicTableWidget
        title="Customer Information"
        variant="minimal"
        data={tests}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination
        searchPlaceholder="Search customer ..."
        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />
    // </TableLayout>
  );
}
