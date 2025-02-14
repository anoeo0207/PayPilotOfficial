"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "rizzui"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { PrinterIcon, Download, Share2, MoveLeft, MoveLeftIcon } from "lucide-react"
import Image from "next/image"
import { CustomerField, InvoiceForm } from '@/app/lib/definition'
import { formatCurrency } from "@/app/lib/utils"
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation"
import { customer } from "@/app/shared/logistics/customer-profile/data"

const note = "Thank you for your business! Payment is due within 14 days."
const terms = "Payment is due within 14 days of invoice date. Late payments are subject to a 5% monthly fee."


export default function InvoiceView ({
    invoice,
    customers,
  }: {
    invoice: InvoiceForm;
    customers: CustomerField[];
  }) {

  const statusStyles = {
    paid: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200/80",
    pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200/80",
    overdue: "bg-red-100 text-red-700 hover:bg-red-200/80",
  }

const handleDownload = async () => {
  const invoiceElement = document.getElementById("invoice"); // Lấy phần tử hóa đơn
  if (!invoiceElement) return;

  const canvas = await html2canvas(invoiceElement, { scale: 2 }); // Chuyển thành ảnh, tăng độ nét
  const image = canvas.toDataURL("image/png"); // Chuyển ảnh thành URL

  // Tạo link tải ảnh
  const link = document.createElement("a");
  link.href = image;
  link.download = `invoice-${invoice.id}.png`;
  link.click();
};
  const router = useRouter();

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        {/* Actions Bar */}
        <div className="mb-6 flex justify-between">
          <h1 className="text-2xl font-bold text-gray-900">View Invoice</h1>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => router.push(`/b-invoices`)}>
              <MoveLeftIcon className="h-4 w-4" />
              Back to invoices table
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <PrinterIcon className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => handleDownload()}>
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden" id="invoice">
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex justify-between">
              <div key={invoice.customer_id}>
                {customers.map((customer) => (
                  <div key={invoice.customer_id}>
                    <Image
                      src={customer.image_url}
                      alt="Company Logo"
                      width={150}
                      height={50}
                      className="mb-4"
                    />
                    </div>
                    ))}
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
                <p className="mt-2 text-sm text-gray-600">Invoice Number</p>
                <p className="font-medium text-gray-900">#{invoice.id}</p>
                <Badge className={`mt-2 ${statusStyles[invoice.status]}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Dates & Customer Info */}
            <div className="grid grid-cols-2 gap-8">
              <div>
              {customers.map((customer) => ( 
                <div className="grid grid-cols-3" key={invoice.customer_id}>
                  <div>
                    <h3 className="font-medium text-gray-900">Bill To:</h3>
                  </div>
                  <div className="">
                    <p className="mt-2 text-sm text-gray-600">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.address}</p>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                </div>
              ))}
              </div>
              <div className="text-right">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Issue Date: <span className="font-medium text-gray-900">{invoice.date.toLocaleDateString("vi-VN")}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Due Date: <span className="font-medium text-gray-900">{new Date(new Date(invoice.date).setDate(new Date(invoice.date).getDate() + 14)).toLocaleDateString("vi-VN")}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mt-8">
              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Amount</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Taxes</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Surcharge</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr key={invoice.id} className="border-b">
                        <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(Number(invoice.initial_amount))}</td>
                        <td className="px-4 py-3 text-center text-sm text-gray-900">{formatCurrency(Number(invoice.taxes))}</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-900">{formatCurrency(Number(invoice.surcharge))}</td>
                        <td className="px-4 py-3 text-right text-sm text-gray-900">
                        {invoice.note}
                        </td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-8 flex justify-end">
              <div className="w-80 space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Initial Amount:</p>
                  <p className="font-medium text-gray-900">{formatCurrency(Number(invoice.initial_amount))}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Taxes:</p>
                  <p className="font-medium text-gray-900">{formatCurrency(Number(invoice.taxes))}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Surcharge:</p>
                  <p className="font-medium text-gray-900">{formatCurrency(Number(invoice.surcharge))}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-base font-medium text-gray-900">Total:</p>
                  <p className="text-base font-bold text-gray-900">{formatCurrency(Number(invoice.amount))}</p>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            {(note || terms) && (
              <div className="mt-8 space-y-4">
                {note && (
                  <div>
                    <h4 className="font-medium text-gray-900">Notes:</h4>
                    <p className="mt-1 text-sm text-gray-600">{note}</p>
                  </div>
                )}
                {terms && (
                  <div>
                    <h4 className="font-medium text-gray-900">Terms & Conditions:</h4>
                    <p className="mt-1 text-sm text-gray-600">{terms}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

