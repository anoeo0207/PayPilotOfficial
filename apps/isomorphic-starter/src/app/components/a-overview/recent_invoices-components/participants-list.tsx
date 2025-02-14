import {Avatar, Button, Title, Text } from 'rizzui';
import WidgetCard from 'isomorphic-core/src/components/cards/widget-card';
import cn from 'isomorphic-core/src/utils/class-names';
import { fetchLatestInvoices } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import { ViewAll } from '@/support-components/button';
import { Separator } from '@/components/ui/separator';

export default  async function ParticipantsList() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <WidgetCard
      title={'Recent invoices from your customers'}
      titleClassName="leading-none"
      headerClassName="mb-3 lg:mb-4"
      action={<ViewAll/>}
    >
      <Separator />
      <div className="grid grid-cols-1 gap-5 mt-5">
        {latestInvoices.map((invoice, i) => (
          <div key={invoice.name} className="flex items-center">
            <div className="relative inline-flex flex-shrink-0">
              <Avatar
                src={invoice.image_url}
                name={invoice.name}
                className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
              />
              {/* {user.status !== 'offline' ? (
                <Badge
                  renderAsDot
                  color={status[user.status]}
                  enableOutlineRing
                  className="absolute bottom-0 end-0 -translate-y-[56%]"
                />
              ) : null} */}
            </div>
            <div className="flex w-[calc(100%-44px)] items-center justify-between gap-2 ps-3.5">
              <div className="w-[calc(100%-40px)]">
                <Title as="h4" className="mb-1 text-sm font-semibold">
                  {invoice.name}
                </Title>
                <Text className="w-[98%] truncate text-gray-500">
                  {invoice.email}
                </Text>
              </div>

              <div className={cn(
                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10'
                )}
              >
                <span className="text-xl font-bold pr-10">{formatCurrency(Number(invoice.amount))}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}

