"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useGSAP(() => {
    // Global GSAP settings can go here
  });

  return <>{children}</>;
}
