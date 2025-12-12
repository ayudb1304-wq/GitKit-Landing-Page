"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

const TECH_STACK = [
  { name: "Next.js 15", image: "/nextjs.jpg", desc: "App Router & React 19" },
  { name: "Drizzle ORM", image: "/drizzleORM.png", desc: "Postgres + SQLite" },
  { name: "Supabase", image: "/supabase.png.jpg", desc: "Hybrid Auth & DB" },
  { name: "Resend", image: "/resend.jpeg", desc: "Transactional Emails" },
  { name: "Stripe", image: "/stripe.png", desc: "Global Payments" },
  { name: "Razorpay", image: "/razorpay.png", desc: "India/Global Payments" },
];

export default function StackOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // Duplicate items for infinite loop illusion
      // In React, we render them twice, but we need to ensure the animation loops correctly
      // GSAP Horizontal Loop helper logic simplified:

      const totalWidth = track.scrollWidth / 2; // Since we doubled content
      
      gsap.to(track, {
        x: -totalWidth,
        duration: 20, // Adjust speed here
        ease: "none",
        repeat: -1,
      });
      
      // Removed ScrollTrigger logic to allow smooth normal page scrolling
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative py-24 bg-zinc-950 overflow-hidden">
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

        <h2 className="relative z-10 mb-12 text-center text-sm font-medium uppercase tracking-widest text-zinc-500">
             Built with the Modern React 19 Stack
         </h2>
      
      <div className="relative flex w-full overflow-hidden">
         {/* Gradient Masks */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-zinc-950 to-transparent" />

        <div ref={trackRef} className="flex gap-8 px-4 w-max">
          {/* First set */}
          {TECH_STACK.map((tech, i) => {
            const isPayments = tech.name === "Payments";
            return (
              <div
                key={`orig-${i}`}
                className="flex h-64 w-80 shrink-0 flex-col items-center justify-center gap-4 p-6 text-center transition-colors"
              >
                <div className={`flex h-16 items-center justify-center overflow-hidden ${isPayments ? 'w-64 px-2' : 'w-16 rounded-xl'}`}>
                  <Image 
                    src={tech.image} 
                    alt={tech.name}
                    width={isPayments ? 256 : 64}
                    height={64}
                    className={`h-full w-full ${isPayments ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{tech.desc}</p>
                </div>
              </div>
            );
          })}
          
          {/* Duplicate set for infinite loop */}
          {TECH_STACK.map((tech, i) => {
            const isPayments = tech.name === "Payments";
            return (
              <div
                key={`dup-${i}`}
                className="flex h-64 w-80 shrink-0 flex-col items-center justify-center gap-4 p-6 text-center transition-colors"
              >
                <div className={`flex h-16 items-center justify-center overflow-hidden ${isPayments ? 'w-64 px-2' : 'w-16 rounded-xl'}`}>
                  <Image 
                    src={tech.image} 
                    alt={tech.name}
                    width={isPayments ? 256 : 64}
                    height={64}
                    className={`h-full w-full ${isPayments ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{tech.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
