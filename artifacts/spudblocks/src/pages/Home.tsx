import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-2 text-primary font-mono text-sm tracking-wider uppercase">
              <div className="h-px w-8 bg-primary" />
              <span>Operator-Grade Launch Discipline</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
              From launch chaos to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
                exchange readiness.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              We are a Web3 launch operator helping pre-TGE token founders build traction, establish trust, and execute flawless market entries. Outcomes, not services.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm group">
                <Link href="/apply">
                  Apply for Review
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm">
                <Link href="/work">View Outcomes</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* KPI Bar */}
      <section className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "$84M+", label: "Assisted in Raises" },
              { value: "12", label: "Token Launches Supported" },
              { value: "94%", label: "KYC Completion Rate" },
              { value: "180k+", label: "Qualified Community Members" }
            ].map((kpi, i) => (
              <div key={i} className="space-y-2 border-l border-border/50 pl-4">
                <div className="text-3xl md:text-4xl font-bold text-foreground font-mono tracking-tight">{kpi.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Diagram Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 md:mb-24 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">The SpudBlocks Launch System</h2>
            <p className="text-lg text-muted-foreground">
              A unified operating layer connecting build, traction, and readiness into a single disciplined motion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Build Phase",
                desc: "Websites, dashboards, token-sale UX, and launch collateral engineered for conversion.",
                link: "/solutions/launch-system"
              },
              {
                icon: BarChart3,
                title: "Traction Engine",
                desc: "Narrative design, community activation, and rigorous reporting cadence.",
                link: "/solutions/growth-engine"
              },
              {
                icon: ShieldCheck,
                title: "Exchange Readiness",
                desc: "Readiness scorecards, compliance inputs, liquidity prep, and market entry strategy.",
                link: "/solutions/exchange-readiness"
              }
            ].map((pillar, i) => (
              <Link key={i} href={pillar.link} className="block group">
                <div className="h-full p-8 border border-border bg-card hover:border-primary/50 transition-colors relative overflow-hidden">
                  <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.desc}</p>
                  
                  <div className="mt-8 flex items-center text-sm font-mono text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}