import Image from 'next/image';
import { PiEnvelopeSimple, PiPhone, PiStarFill, PiWarning } from 'react-icons/pi';
import { Title, Text, Button, Badge } from 'rizzui';
import cn from 'isomorphic-core/src/utils/class-names';
import { avatarIds } from 'isomorphic-core/src/utils/get-avatar';
import { getRandomArrayElement } from 'isomorphic-core/src/utils/get-random-array-element';
import { CustomerField } from '@/app/lib/definition';
import { User2Icon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



interface SidebarProps {
  // className?: string;
  // customer : CustomerField;
}

export default function UserInfoinvoice({
  customer,
}: {
  customer: CustomerField[];
}) {
  const firstCustomer = customer[0]; // Lấy phần tử đầu tiên trong mảng

  if (!firstCustomer) return <div>No customer data available</div>;

  return (
    <article className={cn('lg:px-0 lg:pb-0')}>
      <div className="grid items-end gap-4 @xl:grid-cols-[80px_1fr] @2xl:grid-cols-[128px_1fr] md:gap-6 mt-16">
        <figure className="relative -mt-8 h-20 w-20 rounded-full border-4 border-white drop-shadow @2xl:-mt-12 @2xl:h-32 @2xl:w-32 @4xl:-mt-12 @7xl:-mt-14">
          <span className="absolute bottom-1.5 right-1.5 z-10 h-3 w-3 rounded-full border-2 border-white bg-[#11A849] @2xl:bottom-2.5 @2xl:right-2.5 @3xl:h-4 @3xl:w-4 @4xl:bottom-2 @4xl:right-2" />
          <Image
            src={firstCustomer.image_url}
            alt={firstCustomer.name}
            fill
            priority
            className="rounded-full bg-gray-100"
          />
        </figure>
        <div className="grid grid-cols-2 gap-1 md:gap-1">
          <article className="mb-16">
            <div className="flex items-center gap-2.5">
              <Title as="h3" className="text-lg xl:text-xl">
                {firstCustomer.name}
              </Title>
              <Badge className="gap-1.5">
                Customer
                <User2Icon className="h-4 w-4 fill-[#FFEB3C]" />
              </Badge>
            </div>
            <p>
              <a href={`mailto:${firstCustomer.email}`}>{firstCustomer.email}</a>
            </p>
          </article>
          <article className="flex flex-wrap items-center justify-end gap-3">
            <Button variant="outline" className="flex items-center gap-1 bg-yellow-300">
              <PiWarning size={18} />
              Warn this user
            </Button>
            <Button className="flex items-center gap-1">
              <PiEnvelopeSimple size={18} />
              Message
            </Button>
          </article>
        </div>
      </div>
    </article>
  );
}
