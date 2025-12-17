import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import PainPointMath from "@/components/landing/PainPointMath";
import StackOrbit from "@/components/landing/StackOrbit";
import CodeComparison from "@/components/landing/CodeComparison";
import { Testimonials } from "@/components/ui/unique-testimonial";
import Pricing from "@/components/landing/Pricing";
import FooterPortal from "@/components/landing/FooterPortal";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-yellow-500/30">
      <Navbar />
      <Hero />
      <PainPointMath />
      <StackOrbit />
      <CodeComparison />
      <Testimonials />
      <Pricing />
      <FooterPortal />
    </main>
  );
}
