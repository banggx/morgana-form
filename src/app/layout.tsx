'use client'

import { Inter } from "next/font/google"
import TRPCProvider from "@/components/feature/TRPCProvider"
import { Provider } from 'react-redux'
import ProgressBarProvider from '@/components/feature/ProgressBarProvider'
import AntRegistry from '@/components/feature/AntRegistry'
import ThemeButton from "@/components/feature/ThemeButton"
import store from '@/store'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>
          <Provider store={store}>
            <ProgressBarProvider>
              <AntRegistry>
                {children}
                <ThemeButton />
              </AntRegistry>
            </ProgressBarProvider>
          </Provider>
        </TRPCProvider>
      </body>
    </html>
  );
}
