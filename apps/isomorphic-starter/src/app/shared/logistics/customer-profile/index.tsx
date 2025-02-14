import cn from 'isomorphic-core/src/utils/class-names';
import UserInfo from '@/app/shared/logistics/customer-profile/user-info';
import RecentShipments from '@/app/shared/logistics/customer-profile/recent-shipments';
import PersonalInformation from '@/app/shared/logistics/customer-profile/personal-info';
import { getRandomArrayElement } from 'isomorphic-core/src/utils/get-random-array-element';
import { fetchCustomerLastestInvoices, fetchTotalMoney, fetchCustomersById } from '@/app/lib/action';
import StatCards from '@/components/ui/card-with-icon';

interface CustomerProfileProps {
  className?: string;
  id: string;
}

export default async function CustomerProfile({ className, id }: CustomerProfileProps,) {
  const getCustomer = await fetchCustomersById(id);
  const data = await fetchCustomerLastestInvoices(id);
  const totalMoney = await fetchTotalMoney(id);

  return (
    <div className={cn('@container', className)}>
      <UserInfo customer={getCustomer} />
      <StatCards data={totalMoney} />
      <PersonalInformation customer={getCustomer}/>
      <RecentShipments data={data} />
    </div>
  );
}
