import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const siteUrl = "https://miguelmaestro.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Miguel Maestro | Senior Cloud Engineer - Azure & DevOps Expert",
    template: "%s | Miguel Maestro",
  },
  description:
    "Portfolio profesional de Miguel Maestro, especialista en Azure Cloud, Terraform, CI/CD y automatización DevOps. 2+ años optimizando infraestructuras enterprise con +500 servicios en producción.",
  keywords: [
    "Azure",
    "Cloud Engineer",
    "DevOps",
    "Terraform",
    "IaC",
    "Kubernetes",
    "CI/CD",
    "Azure DevOps",
    "PowerShell",
    "Infrastructure as Code",
    "Miguel Maestro",
    "Cloud Architecture",
    "Azure Administrator",
    "AZ-104",
    "AZ-305",
    "Kyndryl",
    "Naturgy",
  ],
  authors: [
    {
      name: "Miguel Maestro Martínez",
      url: "https://www.linkedin.com/in/miguelmaestromartinez",
    },
  ],
  creator: "Miguel Maestro Martínez",
  publisher: "Miguel Maestro Martínez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "Maestro.Cloud",
    title: "Miguel Maestro | Senior Cloud Engineer",
    description:
      "Transformando infraestructuras cloud en ecosistemas escalables. Azure Expert | DevOps | IaC | AI Enthusiast",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Miguel Maestro - Cloud Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miguel Maestro | Senior Cloud Engineer",
    description:
      "Azure Expert | DevOps | IaC | AI Enthusiast. Transformando infraestructuras en ecosistemas escalables.",
    images: ["/og-image.png"],
    creator: "@miguelmaestro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Miguel Ángel Maestro Martínez",
    jobTitle: "Senior Cloud Infrastructure Engineer",
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    sameAs: [
      "https://www.linkedin.com/in/miguelmaestromartinez",
      "https://github.com/MiguelMaestro",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Kyndryl",
      url: "https://www.kyndryl.com",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Universidad Isabel I",
      },
      {
        "@type": "EducationalOrganization",
        name: "IES Pacífico",
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Microsoft Azure Administrator (AZ-104)",
        recognizedBy: {
          "@type": "Organization",
          name: "Microsoft",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Azure Solutions Architect Expert (AZ-305)",
        recognizedBy: {
          "@type": "Organization",
          name: "Microsoft",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "HashiCorp Terraform Associate",
        recognizedBy: {
          "@type": "Organization",
          name: "HashiCorp",
        },
      },
    ],
    knowsAbout: [
      "Microsoft Azure",
      "DevOps",
      "Terraform",
      "Infrastructure as Code",
      "Kubernetes",
      "Cloud Architecture",
      "Azure DevOps",
      "CI/CD Pipelines",
      "PowerShell",
      "Artificial Intelligence",
      "Machine Learning",
      "Cost Optimization",
      "Security",
      "RBAC",
    ],
    description:
      "Senior Cloud Engineer con 2+ años especializándome en Azure, IaC (Terraform), DevOps y automatización. He gestionado infraestructuras con +500 servicios, optimizado costos cloud y liderado migraciones híbridas complejas.",
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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
