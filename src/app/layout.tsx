import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cann-It — Dumpster Rentals",
  description:
    "You fill it, we spill it. Residential and construction dumpster rentals — fast drop-off, easy pickup, fair pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(barlowCondensed.variable, inter.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
