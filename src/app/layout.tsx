import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "StreetfoodSpotter",
  description: "Ontdek, zoek en deel de beste streetfoodspots.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl" className={`${geist.variable} h-full`}>
      <body className="min-h-full">
        <Header />
        <div className="flex min-h-[calc(100vh-73px)] flex-col">{children}</div>
      </body>
    </html>
  );
}
