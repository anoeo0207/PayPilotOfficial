'use client';
import { Button } from 'rizzui';
import { shippingStatuses } from '@/data/shipment-data';
import StatusField from '@/app/shared/controlled-table/status-field';
import DateFiled from '@/app/shared/controlled-table/date-field';
import { getDateRangeStateValues } from 'isomorphic-core/src/utils/get-formatted-date';
import { PiTrashDuotone } from 'react-icons/pi';
import { useMedia } from 'isomorphic-core/src/hooks/use-media';

const paymentStatusOptions = Object.entries(shippingStatuses).map(
  ([value, label]) => ({ label, value })
);

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

export default function ShipmentTableFilters({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  const isLargeScreen = useMedia('(min-width: 1861px)', false);

  const isNotDateNull = filters['date'][0] || filters['date'][1];
  const isClearable = isFiltered || isNotDateNull;

  return (
    <>
      <DateFiled
        selected={getDateRangeStateValues(filters['date'][0])}
        startDate={getDateRangeStateValues(filters['date'][0]) as Date}
        endDate={getDateRangeStateValues(filters['date'][1]) as Date}
        className="w-full"
        onChange={(date: any) => {
          updateFilter('date', date);
        }}
        selectsRange
        dateFormat="dd MMM yyyy"
        placeholderText="Select created date"
        {...(isMediumScreen && {
          inputProps: {
            label: 'Created Date',
            labelClassName: 'font-medium text-gray-700',
          },
        })}
        maxDate={new Date()}
      />
      <StatusField
        dropdownClassName="!z-10 h-auto"
        options={paymentStatusOptions}
        value={filters['status']}
        onChange={(value: string) => {
          updateFilter('status', value);
        }}
        getOptionValue={(option: { label: any }) => option.label}
        displayValue={(selected: string) =>
          paymentStatusOptions.find((option) => option.label === selected)
            ?.label ?? ''
        }
        {...(isMediumScreen && {
          label: 'Status',
          labelClassName: 'font-medium text-gray-700',
        })}
        {...(isLargeScreen && {
          dropdownClassName: 'w-44 !z-10 h-auto',
        })}
        placement="bottom-start"
        className={'w-auto min-w-[180px]'}
      />
      {isClearable ? (
        <Button
          size="sm"
          onClick={() => {
            handleReset();
          }}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </>
  );
}
