'use client';

import cn from 'isomorphic-core/src/utils/class-names';
import { useMedia } from 'isomorphic-core/src/hooks/use-media';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import { getColumns } from '@/app/shared/logistics/dashboard/top-customer/columns';
import { topCustomers } from '@/data/top-customer';

interface IndexProps {
  className?: string;
}

export default function TopCustomer({ className }: IndexProps) {
  const isBigScreen = useMedia('(min-width: 2100px)', false);
  return (
    <BasicTableWidget
      title="Top Customer"
      className={cn(className)}
      data={topCustomers}
      // @ts-ignore
      getColumns={getColumns}
      pageSize={isBigScreen ? 6 : 5}
      enablePagination
      noGutter
      scroll={{
        x: 900,
      }}
      searchPlaceholder="Search customer"
      paginatorClassName="pe-0 lg:pe-2"
    />
  );
}
