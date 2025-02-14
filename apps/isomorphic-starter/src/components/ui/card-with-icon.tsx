import cn from 'isomorphic-core/src/utils/class-names';
import TicketIcon from 'isomorphic-core/src/components/icons/ticket';
import MoneyInHand from 'isomorphic-core/src/components/icons/money-in-hand';
import TagIcon from 'isomorphic-core/src/components/icons/tag';
import MetricCard from 'isomorphic-core/src/components/cards/metric-card';
import TagIcon2 from 'isomorphic-core/src/components/icons/tag-2';
import TagIcon3 from 'isomorphic-core/src/components/icons/tag-3';
import { TotalMoney } from '@/app/lib/definition';
import { formatCurrency } from '@/app/lib/utils';

export default async function StatCards({
  data,
}: {
  data: TotalMoney[];
}) { 
  const money = data[0];
  return (
    <div
      className={cn('grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 mb-10')}
    >
        <MetricCard
          title="Total Amount"
          metric={formatCurrency(Number(money.total_amount))}
          icon={<MoneyInHand className="h-full w-full" />}
          iconClassName="bg-transparent w-11 h-11"
          className="shadow-lg"
        />
         <MetricCard
          title="Total Money Paid"
          metric={formatCurrency(Number(money.total_money_paid))}
          icon={<TicketIcon className="h-full w-full" />}
          iconClassName="bg-transparent w-11 h-11"
          className="shadow-lg"
        />
         <MetricCard
          title="Total Money Pending"
          metric={formatCurrency(Number(money.total_money_pending))}
          icon={<TagIcon2 className="h-full w-full" />}
          iconClassName="bg-transparent w-11 h-11"
          className="shadow-lg"
        />
    </div>
  );
}
