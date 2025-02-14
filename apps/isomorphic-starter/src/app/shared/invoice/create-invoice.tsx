'use client'

import { useState, useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { User, LucideNotebookPen, Clock, Check, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Input from "@/app/components/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from 'rizzui'
import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/avatar'
import { CustomerField } from '@/app/lib/definition'
import { createInvoice,State } from '@/app/lib/action'

export default function AddInvoiceForm({ customers }: { customers: CustomerField[] }) {
  const router = useRouter()
  const [amount, setAmount] = useState<number>(0)
  const [taxes, setTaxes] = useState<number>(0)
  const [surcharge, setSurcharge] = useState<number>(0)
  const initialState: State = { message: null, errors: {} };
  const [, formAction] = useActionState(createInvoice, initialState);

  const calculateTotal = () => {
    const taxAmount = (amount * taxes) / 100
    const total = amount + taxAmount + surcharge
    return total.toFixed(2)
  }

  // const handleSubmit = async (formData: FormData) => {
  //   const result = await formAction(formData)
  //   if (result?.message === 'success') {
  //     toast({
  //       title: "Invoice created",
  //       description: "Your invoice has been successfully created.",
  //     })
  //     router.push('/dashboard/invoices')
  //   }
  // }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Invoice</CardTitle>
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
              <Select name="customerId">
                <SelectTrigger className="w-full h-42">
                  <SelectValue placeholder="Select a customer"  className="h-42"/>
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={customer.image_url} alt={customer.name} />
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
              <Textarea id="note" name="note" placeholder="Enter invoice details" />
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
                      !date && "text-muted-foreground"
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
              <RadioGroup defaultValue="paid" name="status" className="grid grid-cols-2 gap-4 mt-2">
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
                  <Label htmlFor="initialAmount">Amount</Label>
                  <Input 
                    id="initialAmount" 
                    name="initialAmount"
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
              Create Invoice
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

