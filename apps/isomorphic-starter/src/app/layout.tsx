'use client'
import type { Metadata } from "next";
import { inter, lexendDeca } from "@/app/fonts";
import cn from "isomorphic-core/src/utils/class-names";
import NextProgress from "isomorphic-core/src/components/next-progress";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import { ThemeProvider, JotaiProvider } from "@/app/shared/theme-provider";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";
import "./globals.css";
import { Toaster } from "./components/sonner";
import { usePathname } from 'next/navigation'

// export const metadata: Metadata = {
//   title: "PayPilot",
//   description: "Write your app description",
// };

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const pathname = usePathname()

  // Danh sách các trang không cần layout
  const noLayoutPages = ['/c-customers/inbox', '/']

  if (noLayoutPages.includes(pathname)) {
    return <html
    // 💡 Prevent next-themes hydration warning
    suppressHydrationWarning
  >
    <body
      // to prevent any warning that is caused by third party extensions like Grammarly
      suppressHydrationWarning
      className={cn(inter.variable, lexendDeca.variable, "font-inter")}
    >
      <ThemeProvider>
        <NextProgress />
        <JotaiProvider>
          {children}
          <Toaster />
          <GlobalDrawer />
          <GlobalModal />
        </JotaiProvider>
      </ThemeProvider>
    </body>
  </html>
  }

  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <ThemeProvider>
          <NextProgress />
          <JotaiProvider>
            <HydrogenLayout>{children}</HydrogenLayout>
            <Toaster />
            <GlobalDrawer />
            <GlobalModal />
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
