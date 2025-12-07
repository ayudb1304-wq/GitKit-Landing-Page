"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const TABS = ["Database", "Payments", "Authentication"];

const CODE_SNIPPETS = {
  Database: {
    gitkit: `// db/schema.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  userId: text("user_id").notNull().unique(),
  email: text("email").notNull(),
  plan: text("plan").default("free"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})`,
    legacy: `// prisma/schema.prisma
model Profile {
  id        String   @id @default(cuid())
  userId    String   @unique
  email     String
  plan      String   @default("free")
  createdAt DateTime @default(now())
  // ... 50 more lines of relation boilerplate
  // ... complex migration history
}`
  },
  Payments: {
    gitkit: `// actions/payments.ts
// Supports Stripe, Lemon Squeezy, Razorpay, Dodo
export async function createCheckoutSession(priceId: string) {
  const user = await getUser()
  
  // Example: Stripe Integration
  const session = await stripe.checkout.sessions.create({
    customer: user.stripeCustomerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: \`\${env.NEXT_PUBLIC_APP_URL}/dashboard?success=true\`,
  })

  redirect(session.url)
}`,
    legacy: `// api/stripe/webhook.ts
// ... 200 lines of switch statements
// ... manual signature verification
// ... database sync logic scattered across 3 files
// ... error handling??`
  },
  Authentication: {
    gitkit: `// actions/auth.ts
export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signInWithOtp({
    email: formData.get("email"),
    options: {
      emailRedirectTo: \`\${env.NEXT_PUBLIC_APP_URL}/auth/callback\`,
    },
  })

  return { success: true, message: "Check your email!" }
}`,
    legacy: `// lib/auth.ts
// ... complex next-auth config
// ... custom adapters
// ... debugging why session is null
// ... provider configuration hell`
  }
};

export default function CodeComparison() {
  const [activeTab, setActiveTab] = useState("Database");
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setHoverPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const currentSnippets = CODE_SNIPPETS[activeTab as keyof typeof CODE_SNIPPETS];

  return (
    <section id="code" className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Clean. Modern. <span className="text-yellow-500">Type-Safe.</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Compare our optimized implementation with standard boilerplate bloat.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-white text-zinc-950"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Code Window */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative mx-auto min-h-[400px] w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/20" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
              <div className="h-3 w-3 rounded-full bg-green-500/20" />
            </div>
            <div className="ml-4 text-xs font-mono text-zinc-500">
              {activeTab === "Database" ? "db/schema.ts" : activeTab === "Payments" ? "actions/payments.ts" : "actions/auth.ts"}
            </div>
          </div>

          {/* Base Layer (Legacy Code - "Bad") - Visible by default? OR GitKit visible? 
              Plan says: "Hovering over Legacy Code reveals clean GitKit code underneath."
              Let's make GitKit the DEFAULT (Base), and mask the LEGACY on top? 
              Or Base = Legacy, Reveal = GitKit.
              "We prove our code is superior... Hovering over 'Legacy Code' reveals the clean 'GitKit Code' underneath."
              So Base = Legacy. Reveal = GitKit.
           */}
          
          <div className="p-6 font-mono text-sm text-zinc-500">
            <pre className="whitespace-pre-wrap">{currentSnippets.legacy}</pre>
          </div>

          {/* Reveal Layer (GitKit Code - "Good") */}
          <div
            className="absolute inset-0 bg-zinc-950 p-6 font-mono text-sm text-blue-300 pointer-events-none"
            style={{
                clipPath: isHovering 
                    ? `circle(150px at ${hoverPosition.x}px ${hoverPosition.y}px)`
                    : "circle(0px at 0 0)",
                transition: "clip-path 0.1s ease-out" // Make it snappy
            }}
          >
              <div className="absolute top-0 left-0 right-0 h-10 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3 opacity-0"></div> {/* Spacer for header */}
              <div className="mt-10">
                <pre className="whitespace-pre-wrap text-emerald-400">{currentSnippets.gitkit}</pre>
              </div>
          </div>
          
           {/* Hint Overlay */}
           {!isHovering && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="rounded-full bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400 backdrop-blur-sm border border-zinc-800">
                       Hover to reveal GitKit magic
                   </div>
               </div>
           )}

        </div>
      </div>
    </section>
  );
}
