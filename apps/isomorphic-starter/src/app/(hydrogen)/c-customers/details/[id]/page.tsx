import CustomerProfile from '@/app/shared/logistics/customer-profile';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params; 

  return (
    <div>
      <CustomerProfile id={id} />
    </div>
  );
}

