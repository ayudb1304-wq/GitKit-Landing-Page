"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger"; // Removed unused import
import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";

export default function FooterPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Perspective Grid Animation
      gsap.to(gridRef.current, {
        backgroundPosition: "0px 100px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Glow intensity based on scroll
      gsap.fromTo(
        gridRef.current,
        { opacity: 0.2 },
        {
          opacity: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <footer ref={containerRef} className="relative min-h-[60vh] overflow-hidden bg-zinc-950 pt-32 text-center">
      {/* 3D Grid Floor */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 origin-bottom"
        style={{
          backgroundImage:
            "linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          transform: "perspective(500px) rotateX(60deg) translateY(0)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-between px-6 pb-12 h-full">
        <div className="mb-20">
          <h2 className="mb-8 text-5xl font-bold tracking-tighter text-white md:text-8xl">
            Steal this <br /> Codebase.
          </h2>
          <a
            href="#pricing"
            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-zinc-950 transition-transform hover:scale-105"
          >
            Get Started Now
          </a>
        </div>

        <div className="mt-auto w-full max-w-7xl border-t border-zinc-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-2 font-bold text-zinc-200">
                     <div className="flex h-6 w-6 items-center justify-center rounded overflow-hidden">
                        <Image src="/GitKitLogoWhite.png" alt="GitKit Logo" width={24} height={24} className="h-full w-full object-cover" />
                    </div>
                    GitKit
                </div>
                
                <div className="flex gap-8 text-sm text-zinc-500">
                    <Link href="#" className="hover:text-white">Twitter</Link>
                    <Link href="#" className="hover:text-white">GitHub</Link>
                    <Link href="#" className="hover:text-white">Terms</Link>
                    <Link href="#" className="hover:text-white">Privacy</Link>
                </div>
                
                <div className="text-sm text-zinc-600">
                    © {new Date().getFullYear()} GitKit. All rights reserved.
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
