// 'use client'

// import React from 'react'
// import Link from 'next/link'
// import { useActionState } from 'react'
// import { Users, DollarSign, Check, Clock } from "lucide-react"

// import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar"
// import { Button } from "@/app/components/button"
// import  Input  from "@/app/components/input"
// import { Label } from "@/app/components/label"
// import { RadioGroup, RadioGroupItem } from "@/app/components/radio"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/card"

// import { CustomerField, InvoiceForm } from '@/app/lib/definition'
// import { updateInvoice, State } from '@/app/lib/action'

// export default function EditInvoiceForm({
//   invoice,
//   customers,
// }: {
//   invoice: InvoiceForm;
//   customers: CustomerField[];
// }) {
//   const initialState: State = { message: null, errors: {} };
//   const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
//   const [, formAction] = useActionState(updateInvoiceWithId, initialState);

//   return (
//     <div className="container mx-auto px-4 py-8 min-h-screen mt-10">
//       <Card className="max-w-2xl mx-auto border-gray-700 bg-gray-800 shadow-xl">
//         <CardHeader className="bg-gray-900 rounded-t-lg">
//           <CardTitle className="text-2xl font-bold flex items-center justify-center text-white">
//             <DollarSign className="mr-2" />
//             Edit Invoice
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6 space-y-6">
//           <form action={formAction}>
//             <div className="rounded-md bg-gray-800 p-4 md:p-6 space-y-6">
//               {/* Customer Name */}
//               <div>
//                 <Label htmlFor="customer" className="text-blue-300 font-bold text-lg flex items-center mb-2">
//                   <Users className="mr-2 h-5 w-5" />
//                   Customer
//                 </Label>
//                 <Select name="customerId" defaultValue={invoice.customer_id}>
//                   <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100 h-42">
//                     <SelectValue placeholder="Select a customer" className="h-10" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-700 border-gray-600 h-42">
//                     {customers.map((customer) => (
//                       <SelectItem key={customer.id} value={customer.id} className="hover:bg-gray-600">
//                         <div className="flex items-center space-x-2">
//                           <Avatar>
//                             <AvatarImage src={customer.image_url} />
//                             <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
//                           </Avatar> 
//                           <span className="text-gray-100">{customer.name}</span>
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Invoice Amount */}
//               <div>
//                 <Label htmlFor="amount" className="text-blue-300 font-bold text-lg flex items-center mb-2">
//                   <DollarSign className="mr-2 h-5 w-5" />
//                   Amount
//                 </Label>
//                 <div className="relative mt-2 rounded-md">
//                   <Input
//                     id="amount"
//                     name="amount"
//                     type="number"
//                     step="0.01"
//                     defaultValue={invoice.amount}
//                     placeholder="Enter USD amount"
//                     className="pl-10 w-full bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-400 focus:border-blue-400"
//                   />
//                   <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
//                 </div>
//               </div>

//               {/* Invoice Status */}
//               <fieldset>
//                 <legend className="text-blue-300 font-bold text-lg flex items-center mb-2">
//                   <Clock className="mr-2 h-5 w-5" />
//                   Set the invoice status
//                 </legend>
//                 <RadioGroup defaultValue={invoice.status} name="status" className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="paid" id="paid" className="border-gray-600 text-blue-400" />
//                     <Label htmlFor="paid" className="flex items-center space-x-2 cursor-pointer">
//                       <div className="w-full p-2 bg-green-800 rounded-lg flex items-center">
//                         <Check className="h-4 w-4 mr-2 text-green-300" />
//                         <span className="text-green-100">Paid</span>
//                       </div>
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="pending" id="pending" className="border-gray-600 text-blue-400" />
//                     <Label htmlFor="pending" className="flex items-center space-x-2 cursor-pointer">
//                       <div className="w-full p-2 bg-yellow-800 rounded-lg flex items-center">
//                         <Clock className="h-4 w-4 mr-2 text-yellow-300" />
//                         <span className="text-yellow-100">Pending</span>
//                       </div>
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </fieldset>
//             </div>
//             <div className="mt-6 flex justify-end gap-4">
//               <Link
//                 href="/dashboard/invoices"
//                 className="flex h-10 items-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-600"
//               >
//                 Cancel
//               </Link>
//               <Button 
//                 type="submit" 
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//                 // onClick={() => toast("Invoice edited successfully")}
//               >
//                 Apply changes
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//       <div className="mt-8 text-center text-sm text-gray-600">
//         <p>Need help? Contact our support team.</p>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarIcon, User, LucideNotebookPen, Clock, Check, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Input from "@/app/components/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from 'rizzui'
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/avatar'
import { CustomerField, InvoiceForm } from '@/app/lib/definition'
import { updateInvoice, State } from '@/app/lib/action'
import { formatCurrency } from '@/app/lib/utils'

export default function EditInvoiceForm({
    invoice,
    customers,
  }: {
    invoice: InvoiceForm;
    customers: CustomerField[];
  }) {
  const router = useRouter()
  const [amount, setAmount] = useState<number>(Number(invoice.initial_amount))
  const [taxes, setTaxes] = useState<number>(invoice.taxes)
  const [surcharge, setSurcharge] = useState<number>(invoice.surcharge)
  const [details, setDetails] = useState<string>(invoice.note)
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [, formAction] = useActionState(updateInvoiceWithId, initialState);
  

  const calculateTotal = () => {
    const validAmount = Number(amount) || 0; 
    const validTaxes = Number(taxes) || 0;  
    const validSurcharge = Number(surcharge) || 0; 
  
    const taxAmount = (validAmount * validTaxes) / 100;
    const total = validAmount + taxAmount + validSurcharge;
  
    return total.toFixed(2); 
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Edit Invoice #{invoice.id}</CardTitle>
        <Separator className="my-6" />
      </CardHeader>
      <CardContent className="space-y-6">
        <form action={formAction}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <User className="h-5 w-5" />
                <Label className='font-bold'>Choose a customer:</Label>
              </div>
              <Select name="customerId" defaultValue={invoice.customer_id}>
                  <SelectTrigger className="w-full h-42">
                    <SelectValue placeholder="Select a customer" className="h-42" />
                  </SelectTrigger>
                  <SelectContent className="h-42">
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id} className="hover:bg-gray-600">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={customer.image_url} />
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                          </Avatar> 
                          <span className="text-gray-600">{customer.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>

            <Separator className="my-6" />
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <LucideNotebookPen className="h-5 w-5"/>
                <Label htmlFor="note" className="font-bold">Note:</Label>
              </div>
              <Textarea 
                id="note" 
                name="note" 
                className=""
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter invoice details" 
              />
            </div>

            {/* <Separator className="my-6" /> */}

            {/* <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <Label htmlFor="date" className="font-bold">Invoice Date:</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && " "
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input type="hidden" name="date" value={date ? date.toISOString() : ''} />
            </div> */}

            <Separator className="my-6" />

            <fieldset>
              <legend className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <Label htmlFor='status' className="font-bold">
                  Set the invoice status:
                </Label>
              </legend>
              <RadioGroup defaultValue={invoice.status} name="status" className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="paid" className="border-gray-600 text-green-600" />
                  <Label htmlFor="paid" className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-full p-2 bg-green-100 rounded-lg flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-green-700">Paid</span>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="pending" className="border-gray-600 text-yellow-600" />
                  <Label htmlFor="pending" className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-full p-2 bg-yellow-100 rounded-lg flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                      <span className="text-yellow-700">Pending</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </fieldset>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <DollarSign className="h-5 w-5" />
                <Label className="font-bold">Amount details:</Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input 
                    id="amount" 
                    name="amount"
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxes">Taxes (%)</Label>
                  <Input 
                    id="taxes" 
                    name="taxes"
                    type="number" 
                    value={taxes}
                    onChange={(e) => setTaxes(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surcharge">Surcharge</Label>
                  <Input 
                    id="surcharge" 
                    name="surcharge"
                    type="number" 
                    value={surcharge}
                    onChange={(e) => setSurcharge(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex justify-end items-center space-x-4">
            <Label htmlFor="totalMoney" className="text-lg font-semibold">Total Amount:</Label>
            <div className="w-[200px]">
              <Input 
                id="totalMoney" 
                name="totalMoney"
                type="text" 
                value={`$${calculateTotal()}`}
                defaultValue={formatCurrency(invoice.amount)}
                readOnly
                className="bg-muted text-lg font-semibold text-right"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button 
            // type="button" 
            variant="outline" 
            onClick={() => router.push('/b-invoices')}>
              Cancel
            </Button>
            <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Edit Invoice
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

