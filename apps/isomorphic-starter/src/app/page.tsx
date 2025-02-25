'use client'

import Image from 'next/image';
import { Button, Title, Text } from 'rizzui';
// import LaptopImg from '@public/welcome-laptop.png';
// import MobileImg from '@public/welcome-mobile.png';
import Router, { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

export default function WelcomePage() {
  const router = useRouter();
  return (
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col-reverse items-center justify-between text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px]">
        <div>
          <Title
            as="h2"
            className="mb-3 text-[22px] font-bold leading-snug sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
          >
            Welcome to PayPilot
          </Title>
          <Text className="mb-6 max-w-[612px] text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
          PayPilot is a powerful and intuitive invoice management system designed 
          to help businesses and freelancers streamline their billing process. 
          With PayPilot, you can easily create, send, and track invoices while 
          keeping all your payments organized in one place.
          </Text>
          <div className="mt-8 flex flex-col justify-center gap-4 lg:flex-row lg:justify-start xl:gap-6">
            <Button
              color="primary"
              size="lg"
              className="h-12 px-4 xl:h-14 xl:px-6"
              onClick={() => router.push(routes.Login.login)}
            >
              Login Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-4 xl:h-14 xl:px-6"
            >
              Use without verification
            </Button>
          </div>
        </div>
        <div className="relative">
          {/* <Image
            src={LaptopImg}
            alt="coming-soon"
            className="aspect-[632/630] max-w-[256px] sm:max-w-xs lg:max-w-lg 2xl:max-w-xl 3xl:max-w-[632px]"
          /> */}
          {/* <Image
            src={MobileImg}
            alt="coming-soon"
            className="absolute left-0 top-1/2 z-10 aspect-[275/390] max-w-[100px] -translate-y-1/2 lg:max-w-[210px]"
          /> */}
          <div className="mx-auto h-20 w-32 bg-gray-1000/50 blur-[57px] [transform:rotateX(80deg)]"></div>
          <div className="absolute bottom-10 left-3 mx-auto h-20 w-32 bg-gray-1000/50 blur-[57px] [transform:rotateX(80deg)] lg:left-7"></div>
        </div>
      </div>
    </div>
  );
}
