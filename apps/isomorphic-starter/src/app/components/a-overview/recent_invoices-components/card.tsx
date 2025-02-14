import StatCards from '@/app/shared/ecommerce/dashboard/stat-cards';


export default function Card() {
  return (
    <div className="@container">
        <StatCards className="@2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8" />
    </div>
  );
}
