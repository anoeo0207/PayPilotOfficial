'use client';

import Link from 'next/link';
import { HeaderCell } from '@/app/shared/table';
import { Badge, Text, Tooltip, ActionIcon } from 'rizzui';
import { routes } from '@/config/routes';
import TableAvatar from 'isomorphic-core/src/ui/avatar-card';
import DateCell from 'isomorphic-core/src/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { formatCurrency } from '@/app/lib/utils';
import { RemoveCustomer } from '@/support-components/button';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

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
    title: <HeaderCell title="Total Money" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (_: any, row: any) => (
       <p className="font-bold text-blue-400 text-xl">{formatCurrency(Number(row.total_amount))}</p>
      ),
  },
  {
    title: <HeaderCell title="Total Paid" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (_: any, row: any) => (
      <p className="font-bold text-green-500 text-xl">{formatCurrency(Number(row.total_money_paid))}</p>
     ),
  },
  {
    title: <HeaderCell title="Total Pending" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (_: any, row: any) => (
      <p className="font-bold text-yellow-500 text-xl">{formatCurrency(Number(row.total_money_pending))}</p>
     ),
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
          content={'Edit Customer'}
          placement="top"
          color="invert"
        >
          <Link href={routes.Customers.details(row.id)}>
          <div className="rounded-md border p-2 hover:bg-gray-300" >
            <PencilIcon className="w-4" />
            </div>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Customer'}
          placement="top"
          color="invert"
        >
          <Link href={routes.Customers.details(row.id)}>
              <div className="rounded-md border p-2 hover:bg-gray-300" >
                <EyeIcon className="w-4" />
               </div>
          </Link>
        </Tooltip>
        
        <Tooltip
          size="sm"
          content={'Delete Customer'}
          placement="top"
          color="invert"
        >
          <RemoveCustomer id={row.id}/>
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
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${formatCurrency(Number(value))}</Text>
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
          <Link href={routes.Customers.details(row.customer_id)}>
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
          <Link href={routes.Customers.details(row.customer_id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Customer details'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => RemoveCustomer(row.id)}
        />
      </div>
    ),
  },
];
