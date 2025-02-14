'use client';

import Image from 'next/image';
import { Text } from 'rizzui';
import cn from 'isomorphic-core/src/utils/class-names';
import { HeaderCell } from '@/app/shared/table';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import { CustomerField, Ranking } from '@/app/lib/definition';
import { Country, CountryCode } from '@/app/lib/country';
import {Crown, Gem, Rabbit, Tags, Calendar} from 'lucide-react'

function formatDate(date: Date | string): string {
  const parsedDate = new Date(date); 
  // if (isNaN(parsedDate.getTime())) {
  //   throw new Error('Invalid date');
  // }

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
  const year = String(parsedDate.getFullYear()).slice(-2); 

  return `${day}/${month}/${year}`;
}

function rankingDesign (ranking : Ranking) {
  if (ranking == Ranking.Bronze) {
    return (
      <div className="flex"> 
          <Text className="text-xl font-bold" style={{ color: '#CD7F32' }}>{ranking.toString().toUpperCase()}</Text>
          <Rabbit className="h-6 w-6 text-[#CD7F32] ml-2" />
        </div>
    )
  } else if (ranking ==Ranking.Silver) {
    return (
      <div className="flex">
        <Text className="me-6 text-xl font-bold ml-5" style={{ color: '#C0C0C0' }}>{ranking.toString().toUpperCase()}</Text>
        <Tags className="h-6 w-6 text-[#C0C0C0] ml-2" />
      </div>
    )
  } else if (ranking ==Ranking.Gold) {
    return (
      <div className="flex"> 
        <Text className="text-xl font-bold" style={{ color: '#FFD700' }}>{ranking.toString().toUpperCase()}</Text>
        <Crown className="h-6 w-6 text-[#FFD700] ml-2 " />
      </div>
    )
  } else if (ranking ==Ranking.Diamond) {
    return (
      <div className="flex"> 
        <Text className="me-6 text-xl font-bold" style={{ color: '#B9F2FF' }}>{ranking.toString().toUpperCase()}</Text>
        <Gem className="h-6 w-6 text-[#B9F2FF] ml-2 " />
      </div>
    )
  }
}

function getCountryCode(country: string): string | undefined {
  const entry = Object.entries(CountryCode).find(([key, value]) => key === country);
  return entry ? entry[1] : undefined;
}

export const getColumns = () => [
  // {
  //   title: <HeaderCell title="Country" className="ms-6" />,
  //   dataIndex: 'country',
  //   key: 'country',
  //   width: 100,
  //   render: ({ name, code }: { name: string; code: string }) => (
  //     <div className="ms-6 flex items-center gap-2">
  //       <figure className="relative h-10 w-10">
  //         <Image
  //           fill
  //           quality={100}
  //           alt={`${name} Flag icon`}
  //           className="object-contain"
  //           src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
  //         />
  //       </figure>

  //       <Text as="span" className="whitespace-nowrap">
  //         {name}
  //       </Text>
  //     </div>
  //   ),
  // },
  {
    title: <HeaderCell title="Country" />,
    dataIndex: 'country',
    key: 'country',
    width: 300,
    render: (country: Country) => {
      const code = getCountryCode(country);
      return (
        <div className="ms-6 flex items-center gap-2">
         <figure className="relative h-10 w-10">
           <Image
             fill
             quality={100}
             alt={`${name} Flag icon`}
             className="object-contain"
             src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
           />
         </figure>

         <Text as="span" className="whitespace-nowrap text-xl font-bold">
           {country}
         </Text>
       </div>
      );
    },
  },
  {
    title: <HeaderCell title="Date of birth" />,
    dataIndex: 'date_of_birth',
    key: 'date_of_birth',
    width: 200,
    render: (date_of_birth: Date) => <Text className="text-xl">{formatDate(date_of_birth)}
      </Text>,
  },
  {
    title: <HeaderCell title="Address" />,
    dataIndex: 'address',
    key: 'address',
    width: 300,
    render: (address: string) => <Text className="">{address}</Text>,
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: 'phone_number',
    key: 'phone_number',
    width: 150,
    render: (phone_number: string) => <Text className="">{phone_number}</Text>,
  },
  {
    title: <HeaderCell title="Ranking" className="me-6 justify-end" />,
    dataIndex: 'ranking',
    key: 'ranking',
    align: 'right',
    width: 150,
    render: (ranking: Ranking) => {
      return (
        <Text className="me-6 font-medium">{rankingDesign(ranking)}</Text>
      );
    }
  },
];

export default function PersonalInformation({
  customer,
}: {
  customer: CustomerField[];
}) {
  return (
    <BasicTableWidget
      title="Personal Information"
      className={cn(
        'mt-14 pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0'
      )}
      data={customer}
      getColumns={getColumns}
      noGutter
      enableSearch={false}
      scroll={{
        x: 900,
      }}
    />
  );
}
