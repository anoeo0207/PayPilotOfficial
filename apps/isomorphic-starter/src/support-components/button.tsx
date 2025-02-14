'use client'

import React, {useState} from 'react'; 
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice, deleteCustomer } from '@/app/lib/action';
import { Button} from '@/app/components/button';
import { PlusCircle } from 'lucide-react';

export function CreateInvoice() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className={`gap-1 bg-gradient-to-r from-[#04619F] to-[#2b2b2b] text-white hover:bg-gray-400 text-base sm:text-sm hover:from-gray-400 hover:to-gray-600 ${
        isLoading ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      {isLoading ? (
        <>
          Loading...
        </>
      ) : (
        <>
          <PlusCircle className="h-3.5 w-3.5" />
          <Link href="/dashboard/invoices/create" className="font-bold">
            Create Invoice
          </Link>
        </>
      )}
    </Button>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Button variant="default" className="hover:bg-gray-100 bg-white border border-black px-2">
      <Link href={`/b-invoices/edit/${id}`}><PencilIcon className="w-4 h-4 text-black" /></Link>
    </Button>
  );
}

export function ViewInvoice({ id }: { id: string }) {
  return (
    <Button variant="default" className="hover:bg-gray-100 bg-white border border-black px-2">
      <Link href={`/b-invoices/view/${id}`}><EyeIcon className="w-4 h-4 text-black" /></Link>
    </Button>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form onSubmit={deleteInvoiceWithId}>
      <Button className="hover:bg-gray-100 bg-white border border-black px-2">
        <TrashIcon className="w-4 h-4 text-black" />
      </Button>
    {/* <AlertDialog>
    <AlertDialogTrigger>
  <div
    role="button"
    tabIndex={0}
    className="hover:bg-gray-100 bg-white border border-black rounded-lg p-2 flex items-center justify-center cursor-pointer px-2"
  >
    <TrashIcon className="w-4 h-4 text-black" />
  </div>
</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription className="text-black">
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="hover:bg-gray-300">Cancel</AlertDialogCancel>
          <AlertDialogAction className="hover:bg-red-500" onClick={() => deleteInvoiceWithId()}>
        Continue
    </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog> */}
    </form>
  );
}

export function RemoveCustomer({ id }: { id: string }) {
  const deleteCustomerWithId = () => {
      deleteCustomer(id);
  };

  return (
  <form onSubmit={deleteCustomerWithId}>
  <Button className="rounded-md border p-2 hover:bg-gray-300">
    <TrashIcon className="w-4 text-black" />
  </Button>
  </form>
    );
  }

  export function ViewAll() {
    return (
      <Link href="/b-invoices">
        <Button variant="outline" size="sm" className="text-sm">
          View All
        </Button>
      </Link>
    );
  }