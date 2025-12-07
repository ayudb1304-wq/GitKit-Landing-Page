"use client";

import { useRef, useState } from "react";
import { Check, Zap, HelpCircle, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FEATURES = [
  "Next.js 14 App Router & Server Actions",
  "Supabase Auth & Database Configured",
  "Stripe, Lemon Squeezy, Razorpay & Dodo",
  "Resend Transactional Emails",
  "SEO & OpenGraph ready",
  "Drizzle ORM & Type-safe Schema",
  "Lifetime Updates",
];

const FAQS = [
  {
    question: "What exactly do I get?",
    answer: "You get the full source code for a production-ready Next.js SaaS application. This includes authentication, payments, database schema, email integrations, and more.",
  },
  {
    question: "Is this a one-time payment?",
    answer: "Yes. You pay once and get access to the codebase and all future updates.",
  },
  {
    question: "Can I use this for client projects?",
    answer: "Absolutely. You can use GitKit to build as many projects as you want for yourself or your clients.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the nature of digital products, we cannot offer refunds once the codebase has been downloaded. However, we provide support to help you get set up.",
  },
];

const VALUE_BREAKDOWN = [
  { name: "Next.js SaaS Boilerplate", value: "$500" },
  { name: "Authentication Setup", value: "$200" },
  { name: "Payment Integration", value: "$300" },
  { name: "Database Schema & ORM", value: "$200" },
  { name: "Email System", value: "$150" },
];

const TRUSTED_BY = [
  "Vercel",
  "Supabase",
  "Stripe",
  "YCombinator",
  "ProductHunt",
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <span className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
           <HelpCircle className="h-5 w-5 text-zinc-500" />
           {question}
        </span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-zinc-500 shrink-0" />
        ) : (
          <Plus className="h-5 w-5 text-zinc-500 shrink-0" />
        )}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          height: isOpen ? contentRef.current?.scrollHeight : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-6 text-zinc-400 pl-14">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(
    () => {
    },
    { scope: containerRef }
  );

  return (
    <section id="pricing" ref={containerRef} className="relative py-24 md:py-32">
      <div className="absolute inset-0 z-0 bg-yellow-500/5 blur-[100px]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Pay once, ship <span className="text-yellow-500">forever</span>.
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg text-zinc-400">
          No monthly fees. No hidden costs. Just one payment to save you 200+ hours of development time.
        </p>

        {/* Pricing Card */}
        <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-transform hover:scale-105 duration-300">
          <div className="bg-yellow-500 p-2 text-center text-sm font-bold text-zinc-950 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            LIMITED TIME LAUNCH SPECIAL
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-center gap-2">
               <span className="text-5xl font-bold text-white">$99</span>
               <span className="text-zinc-500 line-through text-xl">$199</span>
            </div>
            <p className="mt-2 text-zinc-400">One-time payment</p>
            
             <div className="mt-4 mb-6 rounded-lg bg-zinc-950/50 p-4 border border-zinc-800/50">
               <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-semibold">Value Breakdown</div>
               <div className="space-y-1">
                 {VALUE_BREAKDOWN.map((item, i) => (
                   <div key={i} className="flex justify-between text-sm">
                     <span className="text-zinc-400">{item.name}</span>
                     <span className="text-zinc-500 line-through">{item.value}</span>
                   </div>
                 ))}
                 <div className="flex justify-between text-sm font-bold pt-2 border-t border-zinc-800 mt-2">
                     <span className="text-yellow-500">Total Value</span>
                     <span className="text-yellow-500">$1,350+</span>
                 </div>
               </div>
             </div>

            <a
              href="https://buy.stripe.com/example" // Placeholder
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 py-4 font-bold text-zinc-950 transition-colors hover:bg-yellow-400"
            >
              <Zap className="h-5 w-5 fill-current" /> Get GitKit
            </a>
            
            <p className="mt-3 text-xs text-zinc-500 animate-pulse">
               ⚡️ Only 13 spots remaining at this price
            </p>

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
            Secure payment via Stripe, Lemon Squeezy, Razorpay, Dodo • Support & Updates included
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto text-left">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h3>
            <div className="grid gap-4">
                {FAQS.map((faq, i) => (
                    <FAQItem key={i} {...faq} />
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
