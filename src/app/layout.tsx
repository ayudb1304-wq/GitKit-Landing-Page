import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GSAPProvider from "@/components/GSAPProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitKit | The Ultimate Next.js 15 SaaS Boilerplate & Starter Kit",
  description: "Ship your startup in days. The first SaaS boilerplate with Multi-Payment (Stripe/Razorpay), Dual Database (Postgres/SQLite), and Hybrid Auth (Supabase/Custom).",
  keywords: ["Next.js 15 boilerplate", "SaaS starter kit", "React 19 starter", "Supabase Auth", "Stripe implementation", "Drizzle ORM"],
  openGraph: {
    title: "Ship your SaaS in a weekend",
    description: "Don't waste 200+ hours on setup. Steal this Next.js 15 + Supabase codebase.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "GitKit Dashboard Preview" }],
  },
  icons: {
    icon: "/GitKitLogoWhite.png",
    shortcut: "/GitKitLogoWhite.png",
    apple: "/GitKitLogoWhite.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-zinc-950 text-white selection:bg-yellow-500/30`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GP74MCQDQX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GP74MCQDQX');
          `}
        </Script>
        <GSAPProvider>{children}</GSAPProvider>
      </body>
    </html>
  );
}
