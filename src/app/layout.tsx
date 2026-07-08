import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1020",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/okritu"),
  title: "Deeksha Pal | Data Analyst & MCA Student | Portfolio",
  description: "Professional portfolio of Deeksha Pal, an aspiring Data Analyst and MCA Student. Expert in Python, SQL/MySQL, Power BI dashboards, and business intelligence reporting. Explore metrics-driven project case studies.",
  keywords: [
    "Deeksha Pal",
    "Data Analyst Portfolio",
    "Entry-level Data Analyst India",
    "Python SQL Data Science",
    "Power BI Dashboards",
    "MCA Student Portfolio Greater Noida",
    "Data Wrangling Pandas NumPy",
    "Business Intelligence Analyst"
  ],
  authors: [{ name: "Deeksha Pal", url: "https://github.com/okritu" }],
  creator: "Deeksha Pal",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://github.com/okritu",
    title: "Deeksha Pal | Data Analyst & MCA Student | Portfolio",
    description: "Explore analytical dashboards, SQL queries, and Python pipelines built by Deeksha Pal. Ready for entry-level business intelligence and analysis roles.",
    siteName: "Deeksha Pal Data Analyst Portfolio",
    images: [
      {
        url: "/og-image.png", // Fallback placeholder if they deploy an OG image
        width: 1200,
        height: 630,
        alt: "Deeksha Pal - Data Analyst Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeksha Pal | Data Analyst & MCA Student | Portfolio",
    description: "Explore analytical dashboards, SQL queries, and Python pipelines built by Deeksha Pal.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
