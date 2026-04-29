import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Network, Shield, Target } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const team = [
  { name: "Julian Vance", role: "Lead Operator", bg: "Ex-Tier 1 Exchange Listing Lead." },
  { name: "Sarah Lin", role: "Market Strategy", bg: "Former Head of Growth at $2B DeFi Protocol." },
  { name: "Marcus Reed", role: "Growth Engineer", bg: "Architected traction loops for 3 Top-50 tokens." },
  { name: "Dr. Elena Rostova", role: "Tokenomics", bg: "PhD in Mechanism Design, ex-Quant." }
];

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.div variants={fadeUp} className="text-primary font-mono text-sm uppercase mb-4 tracking-wider">Mission & Stance</motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              Operators for launch-stage token projects.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              SpudBlocks exists because the current vendor ecosystem fails founders at their most critical moment. Agencies sell retainers; we engineer outcomes. We replace fragmented service providers with a unified, operator-grade execution layer.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">The Operating Core</h2>
            <p className="text-muted-foreground max-w-2xl">A small, senior team. No junior account managers. You work directly with the operators executing your launch.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="border border-border bg-card p-6 relative group overflow-hidden hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center font-mono font-bold text-primary mb-6">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">{member.role}</div>
                <p className="text-sm text-muted-foreground">{member.bg}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Operating Network & Partners</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We maintain direct lines to Tier 1 exchanges, market makers, and institutional capital. We don't introduce you; we prepare you to clear their strict requirements before the first call.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">Tier 1 Exchanges</span>
                </div>
                <div className="flex items-center gap-3">
                  <Network className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">Top-Tier Market Makers</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">Smart Contract Auditors</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">Institutional Capital</span>
                </div>
              </div>
            </div>
            
            <div className="border border-border bg-card p-8">
               <div className="text-xs font-mono text-primary uppercase tracking-wider mb-6">Selected Relationships</div>
               <div className="grid grid-cols-2 gap-px bg-border border border-border">
                 {[1, 2, 3, 4, 5, 6].map(i => (
                   <div key={i} className="bg-card h-24 flex items-center justify-center">
                     <div className="w-8 h-8 rounded-full bg-muted/50 border border-border/50" />
                   </div>
                 ))}
               </div>
               <div className="mt-4 text-xs text-center text-muted-foreground">
                 Entities shown represent operational integration points, not endorsements.
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <div className="text-primary-foreground/70 font-mono text-sm uppercase mb-8 tracking-wider">Manifesto</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
            "Your community size means nothing if 90% of them fail compliance checks at the finish line."
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            We reject vanity metrics, fragmented agencies, and unexecutable roadmaps. We build for founders who understand that TGE is an operational crucible, not a marketing event.
          </p>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Ready to execute?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm group">
              <Link href="/apply">
                Apply for Review
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm">
              <Link href="/work">See Outcomes</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
