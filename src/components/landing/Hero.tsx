"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

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
          x: x * 2,
          y: y * 2,
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16 text-center"
    >
      {/* Background Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      {/* Floating Elements (Abstract representations) */}
      <div ref={floatingIconsRef} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-[20%] top-[20%] h-12 w-12 rounded-xl bg-blue-500/10 blur-xl" />
        <div className="absolute right-[20%] top-[30%] h-16 w-16 rounded-full bg-purple-500/10 blur-xl" />
        <div className="absolute left-[30%] bottom-[20%] h-20 w-20 rounded-full bg-yellow-500/10 blur-xl" />
      </div>

      <div className="relative z-10 max-w-4xl px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-400 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          v2.0 is now live
        </div>

        <h1 className="mb-8 font-sans text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
          Ship your startup in a <br />
          <span ref={textRef} className="font-mono text-zinc-500">
            month
          </span>
          .
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl">
          Don&apos;t waste time on auth, payments, or emails. We&apos;ve built the boring
          stuff so you can focus on your product. Not just a boilerplate, it&apos;s a cheat code.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-lg bg-yellow-500 px-8 font-semibold text-zinc-950 transition-all hover:scale-105 hover:bg-yellow-400"
          >
            Get GitKit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
