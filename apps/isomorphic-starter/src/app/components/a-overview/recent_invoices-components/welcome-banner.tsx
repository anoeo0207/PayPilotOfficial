'use client';

import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import WelcomeBanner from 'isomorphic-core/src/components/banners/welcome';
import { PiBagSimpleBold } from 'react-icons/pi';
import welcomeImg from '@public/shop-illustration.png';
import HandWaveIcon from 'isomorphic-core/src/components/icons/hand-wave';
import { useEffect, useState } from 'react';

export default function WelcomeArea() {
  const [timeOfDay, setTimeOfDay] = useState<string | null>(null); // Thời gian mặc định là null
  const [isLoading, setIsLoading] = useState(true); // Kiểm soát trạng thái tải

  // Hàm lấy thời gian trong ngày
  function getTimeOfDay() {
    const currentTime = new Date().getHours();
    if (currentTime >= 5 && currentTime < 12) {
      return 'Morning';
    } else if (currentTime >= 12 && currentTime <= 17) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  }

  // Đồng bộ thời gian khi component được render xong
  useEffect(() => {
    const time = getTimeOfDay(); // Gọi hàm lấy thời gian
    setTimeOfDay(time); // Cập nhật thời gian
    setIsLoading(false); // Kết thúc trạng thái tải
  }, []);

  return (
    <div className="@container ">
      <WelcomeBanner
        title={
          <>
            Good {timeOfDay}, <br /> User{' '}
            <HandWaveIcon className="inline-flex h-8 w-8" />
          </>
        }
        description={
          'Take a quick look at your invoices analyzation recently!'
        }
        media={
          <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
            <div className="relative">
              <Image
                src={welcomeImg}
                alt="Welcome shop image from freepik"
                className="dark:brightness-95 dark:drop-shadow-md"
              />
            </div>
          </div>
        }
        contentClassName="@2xl:max-w-[calc(100%-340px)]"
        className="border border-muted bg-gradient-to-r from-gray-500 to-gray-100 pb-8 @4xl:col-span-2 @7xl:col-span-8 dark:bg-gray-100/30 lg:pb-9"
      >
        <Link href={routes.Invoices.dashboard} className="inline-flex">
          <Button as="span" className="h-[38px] shadow md:h-10">
            <PiBagSimpleBold className="me-1 h-4 w-4" />{' '}
            <p className="font-bold">Go to Invoice Table</p>
          </Button>
        </Link>
      </WelcomeBanner>
    </div>
  );
}
