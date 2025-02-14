'use client';

import Link from 'next/link';
import { HeaderCell } from '@/app/shared/table';
import { Badge, Text, Tooltip, ActionIcon } from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from 'isomorphic-core/src/components/icons/eye';
import PencilIcon from 'isomorphic-core/src/components/icons/pencil';
import TableAvatar from 'isomorphic-core/src/ui/avatar-card';
import DateCell from 'isomorphic-core/src/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { formatCurrency } from '@/app/lib/utils';
import { DeleteInvoice, UpdateInvoice, ViewInvoice } from '@/support-components/button';

function getStatusBadge(status: string) {
  switch (status) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Pending</Text>
        </div>
      );
    case 'paid':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Paid</Text>
        </div>
      );
  }
}

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    render: (_: any, row: any) => (
      <TableAvatar
        src={row.image_url}
        name={row.name}
        description={row.email.toLowerCase()}
      />
    ),
  },
  {
    title: (
      <HeaderCell
        title="Amount"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (_: any, row: any) => (
      <Text className="font-medium text-gray-700">{formatCurrency(Number(row.amount))}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (_: any, row: any) => getStatusBadge(row.status),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (_: any, row: any) => <DateCell date={row.date} />,
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Order'}
          placement="top"
          color="invert"
        >
          <UpdateInvoice id={row.id}/>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Order'}
          placement="top"
          color="invert"
        >
          <ViewInvoice id={row.id}/>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Order'}
          placement="top"
          color="invert"
        >
          <DeleteInvoice id={row.id}/>
        </Tooltip>
      </div>
    ),
  },
];

export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    render: (_: any, row: any) => (
      <TableAvatar
        src={row.avatar}
        name={row.name}
        description={row.email.toLowerCase()}
      />
    ),
  },
  {
    title: (
      <HeaderCell
        title="Amount"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.Invoices.edit(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Order'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Order'}
          placement="top"
          color="invert"
        >
          <DeleteInvoice id={row.id}/>
        </Tooltip>
      </div>
    ),
  },
];
