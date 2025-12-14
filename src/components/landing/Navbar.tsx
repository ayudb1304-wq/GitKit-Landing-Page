"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image src="/GitKitUpdated.png" alt="GitKit Logo" width={180} height={56} className="h-14 w-auto" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Features
          </Link>
          <Link href="#code" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Code
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Pricing
          </Link>
        </div>

        <button
          onClick={scrollToPricing}
          className="group relative overflow-hidden rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Get GitKit</span>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      </div>
    </nav>
  );
}
