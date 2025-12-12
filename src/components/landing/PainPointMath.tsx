"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger"; // Removed unused import
import { Check, X } from "lucide-react";
// import { cn } from "@/lib/utils"; // Removed unused import
// import clsx from "clsx";
// import { twMerge } from "tailwind-merge";

// Temporary utility if lib/utils doesn't exist yet
// function cn(...inputs: (string | undefined | null | false)[]) {
//   return twMerge(clsx(inputs));
// }

const PAIN_POINTS = [
  { hours: 4, title: "Setting up Authentication", desc: "Hybrid Auth Architecture (Custom JWT or Supabase). OAuth, session management, protected routes." },
  { hours: 8, title: "Database Schema & ORM", desc: "Dual Database Support (Postgres & SQLite). Migrations, type safety, Drizzle ORM." },
  { hours: 12, title: "Payment Integration", desc: "Unified Payments (Stripe + Razorpay). Webhooks, pricing tables, multi-provider." },
  { hours: 16, title: "Email Transactional Logic", desc: "DKIM/SPF records, Template design, Delivery tracking, Rate limiting." },
  { hours: 22, title: "SEO & OpenGraph", desc: "Dynamic sitemaps, Meta tags, Social previews, Structured data." },
];

export default function PainPointMath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".pain-card");
      
      // Counter Animation
      const updateCounter = (value: number) => {
        const isClimax = value >= 22;

        if (!isClimax) {
            // Reset state if scrolling back up
            gsap.to(solutionRef.current, {
                x: "110%",
                opacity: 0,
                duration: 0.5,
                overwrite: true
            });
            
            gsap.to(counterRef.current, {
                color: "white",
                overwrite: true // Kill any color/shake animations
            });
        }

        gsap.to(counterRef.current, {
          innerText: value,
          duration: 0.5,
          snap: { innerText: 1 },
          onUpdate: function () {
            if (counterRef.current) {
                counterRef.current.innerText = Math.round(this.targets()[0].innerText) + "h";
            }
          },
          onComplete: () => {
             if (isClimax) {
                 triggerClimax();
             }
          }
        });
      };

      // Animate cards on scroll
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
              onEnter: () => updateCounter(PAIN_POINTS[index].hours),
              onLeaveBack: () => updateCounter(index > 0 ? PAIN_POINTS[index - 1].hours : 0),
            },
          }
        );
      });

      const triggerClimax = () => {
         // Shake effect
         gsap.to(counterRef.current, {
             keyframes: {
                x: [-5, 5, -5, 5, 0],
             },
             duration: 0.4,
             color: "#EF4444", // Red-500
         });
         
         // Show Solution Card
         gsap.to(solutionRef.current, {
             x: "0%",
             opacity: 1,
             duration: 0.8,
             ease: "power3.out"
         });

         // Reset Counter Visual
         gsap.to(counterRef.current, {
             color: "#22C55E", // Green-500
             text: "0h",
             delay: 0.8,
             duration: 0.2
         });
      };
      
    },
    { scope: containerRef }
  );

  return (
    <section id="features" ref={containerRef} className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Code Snippet Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none mix-blend-lighten">
             <div className="absolute inset-0 bg-zinc-950 z-10 opacity-80" />
             <Image 
                src="/CodeSnippet.png" 
                alt="" 
                fill 
                className="object-cover opacity-20"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 z-20" />
             <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-20" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-2">
            
            {/* Sticky Column: The Calculator */}
            <div className="relative hidden lg:block">
                <div className="sticky top-32 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl overflow-hidden">
                    <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-zinc-500">
                        Development Costs Calculator
                    </h2>
                    <div className="mb-6 font-mono text-8xl font-bold tracking-tighter text-white">
                        <span ref={counterRef}>0h</span>
                    </div>
                    <p className="text-zinc-400">
                        Calculated based on average developer hours for standard SaaS features.
                    </p>

                    {/* Solution Overlay */}
                    <div 
                        ref={solutionRef}
                        className="absolute inset-0 flex flex-col justify-center rounded-2xl bg-zinc-950 p-8 opacity-0 translate-x-[110%]"
                    >
                        <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-green-500">
                            With GitKit
                        </h3>
                        <div className="mb-4 font-mono text-8xl font-bold tracking-tighter text-white">
                            0h
                        </div>
                         <p className="text-zinc-400">
                            Start building your unique features immediately. Everything else is done.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scrollable Column: The Pain */}
            <div ref={cardsRef} className="flex flex-col gap-32 pt-12 lg:pt-0">
                {PAIN_POINTS.map((point, i) => (
                    <div key={i} className="pain-card flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                             <X className="h-6 w-6" />
                        </div>
                        <div>
                             <h3 className="mb-2 text-2xl font-bold text-white">{point.title}</h3>
                             <p className="text-lg text-zinc-400">{point.desc}</p>
                        </div>
                        <div className="mt-2 inline-flex items-center gap-2 text-sm font-mono text-red-400">
                            +{point.hours} HOURS
                        </div>
                    </div>
                ))}
                
                {/* Mobile-only visible climax element (simplified) */}
                <div className="block lg:hidden rounded-xl border border-green-500/20 bg-green-500/10 p-8">
                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                             <Check className="h-6 w-6" />
                        </div>
                        <h3 className="mt-4 mb-2 text-2xl font-bold text-white">The GitKit Solution</h3>
                        <p className="text-lg text-zinc-400">Skip the setup. Start shipping.</p>
                </div>
            </div>
        </div>
    </section>
  );
}
