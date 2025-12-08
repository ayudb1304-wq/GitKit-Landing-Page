import React from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Minimal UI Components for the Mock
const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("rounded-lg border border-zinc-800 bg-zinc-950/50 text-zinc-100 shadow-sm", className)}>
    {children}
  </div>
);

const CardHeader = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
);

const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>{children}</h3>
);

const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <p className={cn("text-sm text-zinc-400", className)}>{children}</p>
);

const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("p-6 pt-0", className)}>{children}</div>
);

const Button = ({ 
  className, 
  variant = "default", 
  size = "default", 
  children 
}: { 
  className?: string; 
  variant?: "default" | "outline" | "ghost"; 
  size?: "default" | "sm"; 
  children: React.ReactNode 
}) => {
  const variants = {
    default: "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/90",
    outline: "border border-zinc-800 bg-transparent hover:bg-zinc-800 text-zinc-100",
    ghost: "hover:bg-zinc-800 text-zinc-100",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
  };
  return (
    <button className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)}>
      {children}
    </button>
  );
};

const Badge = ({ className, variant = "default", children }: { className?: string; variant?: "default" | "secondary"; children: React.ReactNode }) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)}>
      {children}
    </div>
  );
};

export function HeroDashboardMock() {
  return (
    <div className="w-full h-full rounded-xl bg-zinc-950 overflow-hidden pointer-events-none select-none text-left">
      {/* Fake Navbar for context */}
      <div className="border-b border-zinc-800 bg-zinc-900/40 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm text-zinc-100">SaaS Starter</span>
          <span className="text-sm text-zinc-600">/</span>
          <span className="text-sm text-zinc-400">Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-xs font-bold text-yellow-500">
            JD
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8 bg-zinc-950">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100">Dashboard</h2>
            <p className="text-zinc-400">Welcome back, John Developer!</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="w-full md:w-auto">Download Report</Button>
            <Button size="sm" className="w-full md:w-auto">Add Integration</Button>
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/20 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-400">Current Plan</p>
                <p className="text-2xl font-bold text-zinc-100">Pro Plan</p>
              </div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0 w-fit">
                Active
              </Badge>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm text-zinc-400">Renews on</p>
              <p className="text-sm font-medium text-zinc-200">Dec 31, 2024</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-200">Total Revenue</CardTitle>
              <span className="text-zinc-500 text-xs">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">$12,450</div>
              <p className="text-xs text-zinc-500 flex items-center gap-1 text-green-500">
                <ArrowUpRight className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-200">Subscriptions</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-zinc-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">432</div>
              <p className="text-xs text-zinc-500 flex items-center gap-1 text-green-500">
                <ArrowUpRight className="h-3 w-3" />
                +4% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-200">Sales</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-zinc-500"><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /></svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">1,203</div>
              <p className="text-xs text-zinc-500 flex items-center gap-1 text-green-500">
                <ArrowUpRight className="h-3 w-3" />
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-200">Active Now</CardTitle>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">42</div>
              <p className="text-xs text-zinc-500">You are online</p>
            </CardContent>
          </Card>
        </div>

        {/* Mocked TodoList */}
        <Card>
          <CardHeader>
            <CardTitle className="text-zinc-100">Launch Checklist</CardTitle>
            <CardDescription>
              Your guide to launching your SaaS in 3 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { title: "Clone GitKit repository", done: true },
                { title: "Set up Supabase & Stripe keys", done: true },
                { title: "Customize landing page copy", done: true },
                { title: "Launch on Product Hunt", done: false },
              ].map((todo, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-zinc-800 p-3 bg-zinc-900/50">
                  <div className={cn("flex h-5 w-5 items-center justify-center rounded border", todo.done ? "bg-yellow-500 border-yellow-500 text-zinc-950" : "border-zinc-700")}>
                    {todo.done && <Check className="h-3.5 w-3.5" />}
                  </div>
                  <span className={cn("flex-1 text-sm", todo.done ? "text-zinc-500 line-through" : "text-zinc-300")}>
                    {todo.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

