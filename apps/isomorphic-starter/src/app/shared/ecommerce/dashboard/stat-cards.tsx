import MetricCard from 'isomorphic-core/src/components/cards/metric-card';
import cn from 'isomorphic-core/src/utils/class-names';
import {
  PiUserDuotone,
  PiInvoiceDuotone,
  PiBankDuotone,
  PiChartPieSliceDuotone,
} from 'react-icons/pi';
import { fetchCardData } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';

export default async function StatCards({ className }: { className?: string }) {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices, 
  } = await fetchCardData();

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 3xl:gap-8 4xl:gap-9 ${className}`}>
      
      {/* Total Invoices */}
      <MetricCard
        title="Total Invoices"
        metric={numberOfInvoices}
        metricClassName="lg:text-[22px]"
        icon={<PiInvoiceDuotone className="h-6 w-6" />}
        iconClassName={cn(
          '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5 text-[#3872FA]'
        )}
        className="w-full"
      />

      {/* Total Money Paid */}
      <MetricCard
        title="Total Money Paid"
        metric={formatCurrency(Number(totalPaidInvoices))}
        metricClassName="lg:text-[22px]"
        icon={<PiChartPieSliceDuotone className="h-6 w-6" />}
        iconClassName={cn(
          '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5 text-[#10b981]'
        )}
        className="w-full"
      >
        {/* <Text className="mt-5 flex items-center border-t border-dashed border-muted pt-4 leading-none text-gray-500">
        <Text
          as="span"
          className={cn(
            'me-2 inline-flex items-center font-medium',
            stat.increased ? 'text-green' : 'text-red'
          )}
        >
          {stat.increased ? (
            <PiCaretDoubleUpDuotone className="me-1 h-4 w-4" />
          ) : (
            <PiCaretDoubleDownDuotone className="me-1 h-4 w-4" />
          )}
          {stat.percentage}%
        </Text>
        <Text as="span" className="me-1 hidden @[240px]:inline-flex">
          {stat.increased ? 'Increased' : 'Decreased'}
        </Text>{' '}
        last month
      </Text> */}
        </MetricCard>

      {/* Total Money Pending */}
      <MetricCard
        title="Total Money Pending"
        metric={formatCurrency(Number(totalPendingInvoices))}
        metricClassName="lg:text-[22px]"
        icon={<PiBankDuotone className="h-6 w-6" />}
        iconClassName={cn(
          '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5 text-[#f59e0b]'
        )}
        className="w-full"
      />

      {/* Total Customers */}
      <MetricCard
        title="Total Customers"
        metric={numberOfCustomers}
        metricClassName="lg:text-[22px]"
        icon={<PiUserDuotone className="h-6 w-6" />}
        iconClassName={cn(
          '[&>svg]:w-10 [&>svg]:h-8 lg:[&>svg]:w-11 lg:[&>svg]:h-9 w-auto h-auto p-0 bg-transparent -mx-1.5 text-[#8b5cf6]'
        )}
        className="w-full"
      />
    </div>
  );
}
