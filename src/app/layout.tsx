import type { Metadata } from "next";
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
  title: "GitKit - Ship Faster",
  description: "The world's first Multi-Payment SaaS Architecture. We abstracted the webhook hell so you can swap providers like components. Type-safe, multi-merchant, ready to ship.",
  icons: {
    icon: "/GitKitLogo.png",
    shortcut: "/GitKitLogo.png",
    apple: "/GitKitLogo.png",
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
        <GSAPProvider>{children}</GSAPProvider>
      </body>
    </html>
  );
}
