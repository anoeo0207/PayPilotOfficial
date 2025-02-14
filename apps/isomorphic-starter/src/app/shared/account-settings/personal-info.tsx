'use client'

import React, { useState, useActionState} from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import  Input from '@/app/components/input';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/app/components/checkbox';
import { Separator } from "@/components/ui/separator";
import { AddCustomer } from '@/app/lib/action';
import CountrySelect from '@/components/ui/react-select-with-search';
import { DatePicker } from '@/components/ui/date-picker';
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/avatar"
import { User, Phone, Flag, Calendar, Mail, Home, ImageIcon } from 'lucide-react';

const defaultAvatar = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

function formatDate(dateString: string): string {
  const date = new Date(dateString); // Chuyển chuỗi ngày thành đối tượng Date
  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày, đảm bảo 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (bắt đầu từ 0, nên cộng 1)
  const year = String(date.getFullYear()).slice(-2); // Lấy 2 chữ số cuối của năm

  return `${day}/${month}/${year}`;
}

export default function AddCustomerForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [imageSrc, setImageSrc] = useState(defaultAvatar);
  const [fileName, setFileName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        image = e.target?.result as string; 
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const initialState ={ 
    message: "",
    errors: {
      name: [],
      email: [],
      phone: [],
      address: [],
      image: [],
      country: [],
      birth: [],
    }
};
  const [state, formAction] = useActionState(AddCustomer, initialState);

  return (
    <form action={formAction}>
      <Card className="mx-auto shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Enter customer information here</CardTitle>
        <Separator className="my-6" />
      </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center space-x-6 justify-center items-center">
            <Avatar className="w-64 h-64">
              <AvatarImage src={imageSrc} alt="Customer Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid grid-cols-1">
              <div className="flex-1">
                <Label htmlFor="customer-image" className="flex items-center gap-2 mb-2">
                  <ImageIcon className="w-4 h-4" />
                  Profile Picture
                </Label>
                <Input
                  id="customer-image"
                  type="file"
                  className="w-full"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <p>or</p>
                <Input
                  id="customer-image"
                  name="customer-image"
                  className="w-full"
                  placeholder="Enter image URL here"
                  onChange={(e) => setImageSrc(e.target.value)}
                />
              </div>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </Label>
              <Input id="customer-name" name="customer-name" placeholder="Enter customer's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input id="customer-phone" name="customer-phone" placeholder="+1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-country" className="flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Nationality
              </Label>
              <CountrySelect selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>
              <Input
                type="hidden"
                name="customer-country"
                value={selectedCountry || ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customer-birthday" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </Label>
              <DatePicker date={selectedDate} setDate={setSelectedDate} />
              <Input
                type="hidden"
                name="customer-birth"
                value={selectedDate ? formatDate(selectedDate.toDateString()) : ""}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="customer-email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input id="customer-email" name="customer-email" type="email" placeholder="Enter customer's email" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="customer-address" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Address
              </Label>
              <Input id="customer-address" name="customer-address" placeholder="Enter customer's address" />
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-2">
            <Checkbox className="mb-6" required />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="terms" className="text-sm font-medium text-gray-700">
                Accept terms and policy
              </Label>
              <p className="text-sm text-gray-500">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 flex justify-end space-x-4 p-6">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            Add Customer
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

