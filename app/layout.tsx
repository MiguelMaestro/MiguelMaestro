import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Miguel Maestro | Cloud Engineer & Azure Expert",
  description:
    "Portfolio profesional de Miguel Maestro Martínez - Cloud Engineer especializado en Azure, DevOps y soluciones en la nube.",
  keywords: [
    "Azure",
    "Cloud Engineer",
    "DevOps",
    "Portfolio",
    "AI",
    "Microsoft",
    "Terraform",
  ],
  authors: [{ name: "Miguel Maestro Martínez" }],
  openGraph: {
    title: "Miguel Maestro | Cloud Engineer & Azure Expert",
    description: "Portfolio profesional de Miguel Maestro Martínez",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          "antialiased min-h-screen bg-background text-foreground"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
