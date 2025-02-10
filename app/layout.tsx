import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });
import { CSPostHogProvider } from "./provider";

export const metadata: Metadata = {
  title: "PhysNova",
  description: "A self-testing platform for IB Physics Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={inter.className}>
          {children}
          <Analytics />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
