"use client";

import { Check, Zap } from "lucide-react";
import Image from "next/image";

const FEATURES = [
  "Next.js 14 App Router & Server Actions",
  "Supabase Auth & Database Configured",
  "Stripe, Lemon Squeezy, Razorpay & Dodo",
  "Resend Transactional Emails",
  "SEO & OpenGraph ready",
  "Drizzle ORM & Type-safe Schema",
  "Lifetime Updates",
  "Discord Community Access",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="absolute inset-0 z-0 bg-yellow-500/5 blur-[100px]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Pay once, ship <span className="text-yellow-500">forever</span>.
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg text-zinc-400">
          No monthly fees. No hidden costs. Just one payment to save you 200+ hours of development time.
        </p>

        <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-transform hover:scale-105 duration-300">
          <div className="bg-yellow-500 p-2 text-center text-sm font-bold text-zinc-950">
            LAUNCH SPECIAL
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-center gap-2">
               <span className="text-5xl font-bold text-white">$129</span>
               <span className="text-zinc-500 line-through text-xl">$249</span>
            </div>
            <p className="mt-2 text-zinc-400">One-time payment</p>
            
            <a
              href="https://buy.stripe.com/example" // Placeholder
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 py-4 font-bold text-zinc-950 transition-colors hover:bg-yellow-400"
            >
              <Zap className="h-5 w-5 fill-current" /> Get GitKit
            </a>

            <div className="mt-8 space-y-4 text-left">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-zinc-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-zinc-800 bg-zinc-900/50 p-4 text-center text-xs text-zinc-500">
            Secure payment via Stripe, Lemon Squeezy, Razorpay, Dodo • 14-day money-back guarantee
          </div>
        </div>
      </div>
    </section>
  );
}
