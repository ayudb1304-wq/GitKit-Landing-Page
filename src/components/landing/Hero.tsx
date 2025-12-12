"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { HeroDashboardMock } from "@/components/landing/HeroDashboardMock";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Text Scramble Animation
      const words = ["month", "week", "days", "weekend"];
      const tl = gsap.timeline({ repeat: 0 });

      words.forEach((word) => {
        tl.to(textRef.current, {
          duration: 0.8,
          text: word,
          ease: "none",
          delay: 0.2,
        });
      });

      // Highlight the final word
      tl.to(textRef.current, {
        color: "#EAB308", // Yellow-500
        textShadow: "0 0 20px rgba(234, 179, 8, 0.5)",
        duration: 0.5,
      });

      // Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!gridRef.current || !floatingIconsRef.current) return;
        
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(gridRef.current, {
          x: -x,
          y: -y,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(floatingIconsRef.current, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-32 text-center"
    >
      {/* Background Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-4xl px-6">
        <h1 className="mb-8 font-sans text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
          Ship your <span className="text-yellow-500">Next.js SaaS</span> in a <br />
          <span ref={textRef} className="font-mono text-zinc-500">
            month
          </span>
          .
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl">
          Stop building from scratch. The ultimate Next.js 15 SaaS boilerplate with Supabase, Stripe, Razorpay, Drizzle ORM, SQLite and Tailwind CSS built-in. Save 210+ hours of development time.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            aria-label="Get GitKit SaaS Boilerplate"
            className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-lg bg-yellow-500 px-8 font-semibold text-zinc-950 transition-all hover:scale-105 hover:bg-yellow-400"
          >
            Get GitKit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div
        ref={floatingIconsRef}
        className="mt-20 relative w-full max-w-5xl mx-auto px-6 [perspective:1000px]"
      >
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-yellow-500/20 blur-[100px] -z-10" />

        {/* 3D Container */}
        <div className="transform [transform:rotateX(12deg)] hover:[transform:rotateX(0deg)] transition-all duration-700">
          <HeroDashboardMock />
        </div>
      </div>
    </section>
  );
}
