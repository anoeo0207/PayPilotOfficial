'use client';

import Image from 'next/image';
import { Text } from 'rizzui';
import cn from 'isomorphic-core/src/utils/class-names';
import DateCell from 'isomorphic-core/src/ui/date-cell';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import { CustomerLastestInvoice } from '@/app/lib/definition';
import { formatCurrency } from '@/app/lib/utils';
import { CheckIcon } from 'lucide-react';
import { PiWarningDiamondLight } from 'react-icons/pi';

function statusDesign (status : 'pending' | 'paid') {
  if (status == 'pending') {
    return (
      <div>
        <PiWarningDiamondLight className="h-5 w-5" />
        <Text className="block font-medium font-bold text-yellow-600">{status.toUpperCase()}</Text>
    </div>
  );
  } else if (status == 'paid') {
    return (
      <div>
        <CheckIcon />
        <Text className="block font-medium text-green-600 font-bold">{status.toUpperCase()}</Text>
    </div>
    );
  }
}

export const getColumns = () => [
  {
    title: (
      <Text as="span" fontWeight="semibold" className="block">
        ID
      </Text>
    ),
    dataIndex: 'id',
    key: 'id',
    width: 200,
    render: (id: string) => (
      <Text className="block font-medium text-gray-800">{id}</Text>
    ),
  },
  {
    title: (
      <Text as="span" fontWeight="semibold" className="block">
        Amount
      </Text>
    ),
    dataIndex: 'amount',
    key: 'amount',
    width: 200,
    render: (amount: number) => (
      <Text className="block font-medium text-gray-800">{formatCurrency(Number(amount))}</Text>
    ),
  },
  {
    title: (
      <Text as="span" fontWeight="semibold" className="block">
        Status
      </Text>
    ),
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: (status: 'pending' | 'paid') => (
      statusDesign(status)
    ),
  },
  {
    title: (
      <Text as="span" fontWeight="semibold" className="block">
        Date
      </Text>
    ),
    dataIndex: 'date',
    key: 'date',
    width: 200,
    render: (date: Date) => <DateCell date={date} />,
  },
];

export default function RecentShipments({
  data,
}: {
  data: CustomerLastestInvoice[];
}) {
  return (
    <BasicTableWidget
      title="Recent Invoices"
      className={cn(
        'mb-3 mt-14 pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0'
      )}
      data={data}
      getColumns={getColumns}
      noGutter
      scroll={{
        x: 900,
      }}
    />
  );
}
