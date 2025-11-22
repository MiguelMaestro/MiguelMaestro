import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Miguel Maestro | Cloud Engineer & Azure Expert",
  description: "Portfolio of Miguel Maestro Martínez, Cloud Engineer & Azure Expert.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, "antialiased min-h-screen bg-background text-foreground")}>
        {children}
      </body>
    </html>
  );
}
