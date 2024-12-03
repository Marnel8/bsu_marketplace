import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/hoc/Providers";
import { Toaster } from "@/components/ui/toaster";

const parkinSans = localFont({
  src: "./fonts/Parkinsans-Regular.ttf",
  variable: "--font-park",
  weight: "100 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "BatStateU Marketplace",
  description: "BatStateU Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={` ${parkinSans.variable} antialiased bg-gray-50`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
