"use client";

import { useState } from "react";
import { Check, Zap, HelpCircle, Minus, ChevronDown, Github } from "lucide-react";

const FEATURES = [
  "Next.js 15 App Router & React 19",
  "Shadcn UI + Tailwind CSS v4",
  "Hybrid Auth (Supabase + Custom JWT)",
  "Unified Payments (Stripe + Razorpay)",
  "PostgreSQL + SQLite (Dual Database Support)",
  "Protected Dashboard & Admin Views",
  "Activity Logging & Security System",
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
  { name: "Full SaaS Boilerplate", value: "$500 Value" },
  { name: "Auth & Security (20 Dev Hours)", value: "$2,000 Value" },
  { name: "Payments & Webhooks (30 Dev Hours)", value: "$3,000 Value" },
  { name: "UI & Dashboard (15 Dev Hours)", value: "$1,500 Value" },
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
          <ChevronDown className="h-5 w-5 text-zinc-500 shrink-0" />
        )}
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
            <div className="px-6 pb-6 text-zinc-400 pl-14">
            {answer}
            </div>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [githubUsername, setGithubUsername] = useState("");

  const isUsernameValid = githubUsername.trim().length > 0;
  const basePaymentLink = process.env.NEXT_PUBLIC_DODO_PAYMENT_LINK || "";

  const handleCheckout = () => {
    if (!isUsernameValid || !basePaymentLink) return;
    
    // Construct URL with metadata
    const checkoutUrl = `${basePaymentLink}${basePaymentLink.includes("?") ? "&" : "?"}metadata_github_username=${encodeURIComponent(githubUsername.trim())}`;
    
    // Open in new tab
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            ⚡ EARLY ADOPTER BATCH: 50% OFF
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-center gap-2">
               <span className="text-5xl font-bold text-white">$99</span>
               <span className="text-zinc-500 line-through text-xl">$199</span>
            </div>
            <p className="mt-2 text-zinc-400">One-time payment. Own the code forever.</p>
            
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
                     <span className="text-yellow-500">$7,000+</span>
                 </div>
               </div>
             </div>

            {/* GitHub Username Pre-Checkout Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}
              className="mb-4"
            >
              <div className="relative">
                <label htmlFor="github-username" className="sr-only">GitHub Username</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Github className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  id="github-username"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="Enter your GitHub username"
                  autoComplete="off"
                  spellCheck="false"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors"
                />
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                We&apos;ll invite this GitHub account to the private repo after purchase
              </p>

              <button
                type="submit"
                disabled={!isUsernameValid}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold transition-all ${
                  isUsernameValid
                    ? "bg-yellow-500 text-zinc-950 hover:bg-yellow-400 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }`}
              >
                <Zap className="h-5 w-5 fill-current" />
                {isUsernameValid ? "🚀 Ship My SaaS Today" : "Enter Username"}
              </button>
            </form>
            
            <p className="mt-3 text-xs text-zinc-500 animate-pulse">
               Price increases to $199 after next 36 sales.
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
            Secure payment via Stripe & Razorpay • Support & Updates included
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
