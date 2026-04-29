import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, XCircle, Rocket, Activity, BarChart3 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function WhoWeServe() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }} className="max-w-4xl">
            <motion.div variants={fadeUp} className="text-primary font-mono text-sm uppercase mb-4 tracking-wider">Audience</motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              Built for token teams under launch pressure.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              We partner with founders who recognize that execution is the only differentiator. If you are preparing for a TGE, activating a live token, or orchestrating an ecosystem, we operate alongside you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-border bg-card p-8 hover:border-primary/50 transition-colors">
              <Rocket className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Pre-TGE Founders</h3>
              <p className="text-muted-foreground mb-8">
                Teams approaching their Token Generation Event within 3 to 6 months, needing an integrated launch mechanism.
              </p>
              <div className="space-y-3 mb-8 border-t border-border pt-6">
                <div className="text-sm font-mono text-foreground uppercase tracking-wider mb-4">Who it's for</div>
                {["Seed to Series A funded", "Smart contracts audited", "Need sale UX & compliance flows"].map(item => (
                  <div key={item} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-muted/50 border border-border/50 text-sm">
                <span className="font-bold">Example Outcome:</span> $40M TVL secured pre-launch with zero downtime during the public sale window.
              </div>
            </div>

            <div className="border border-border bg-card p-8 hover:border-primary/50 transition-colors">
              <Activity className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Live Token Teams</h3>
              <p className="text-muted-foreground mb-8">
                Projects with active tokens that need to reboot their narrative, activate their community, or prepare for new exchange listings.
              </p>
              <div className="space-y-3 mb-8 border-t border-border pt-6">
                <div className="text-sm font-mono text-foreground uppercase tracking-wider mb-4">Who it's for</div>
                {["Post-TGE seeking growth", "Narrative pivot required", "Preparing for Tier 1 listing"].map(item => (
                  <div key={item} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-muted/50 border border-border/50 text-sm">
                <span className="font-bold">Example Outcome:</span> 118% MoM growth in verified on-chain active users.
              </div>
            </div>

            <div className="border border-border bg-card p-8 hover:border-primary/50 transition-colors">
              <BarChart3 className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Ecosystems & L1/L2s</h3>
              <p className="text-muted-foreground mb-8">
                Foundations and networks requiring structured developer onboarding, grant distribution portals, and liquidity deployment.
              </p>
              <div className="space-y-3 mb-8 border-t border-border pt-6">
                <div className="text-sm font-mono text-foreground uppercase tracking-wider mb-4">Who it's for</div>
                {["Mainnet approaching", "Need developer portals", "Managing grant programs"].map(item => (
                  <div key={item} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-muted/50 border border-border/50 text-sm">
                <span className="font-bold">Example Outcome:</span> 850+ active builders onboarded via automated grant system in 6 weeks.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Qualification Matrix</h2>
            <p className="text-muted-foreground">We do not accept every project. We align with founders who view launch as an operational discipline.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-border bg-card p-8">
              <h3 className="font-mono text-primary uppercase tracking-wider mb-6 pb-4 border-b border-border flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-3" />
                We're a fit if...
              </h3>
              <ul className="space-y-4">
                {[
                  "You have a working product or testnet, not just a whitepaper.",
                  "You view TGE as an operational milestone, not a marketing event.",
                  "You are prepared to enforce strict KYC/AML on your community.",
                  "You need an execution partner, not a consultative advisor.",
                  "You value verifiable on-chain metrics over vanity social counts."
                ].map(item => (
                  <li key={item} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border bg-card p-8">
              <h3 className="font-mono text-destructive uppercase tracking-wider mb-6 pb-4 border-b border-border flex items-center">
                <XCircle className="w-5 h-5 mr-3" />
                We're not a fit if...
              </h3>
              <ul className="space-y-4">
                {[
                  "You are looking for guaranteed exchange listings or market making.",
                  "You want to launch an un-audited token in less than 30 days.",
                  "You measure success strictly by Twitter followers and Discord members.",
                  "Your core mechanism is reliant entirely on unsustainable inflationary yield.",
                  "You are seeking legal or financial advice."
                ].map(item => (
                  <li key={item} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 mr-3 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-sm font-mono text-primary uppercase tracking-wider mb-4">Process Snapshot</div>
            <h2 className="text-3xl font-bold tracking-tighter mb-12">How engagements begin.</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 border border-border bg-card p-8">
              <div className="flex-1 text-center md:text-left">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto md:mx-0 mb-4">1</div>
                <div className="font-bold mb-2">Apply</div>
                <div className="text-sm text-muted-foreground">Submit your project details via our secure intake form.</div>
              </div>
              <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto md:mx-0 mb-4">2</div>
                <div className="font-bold mb-2">Review</div>
                <div className="text-sm text-muted-foreground">We review within 48h to determine operational fit.</div>
              </div>
              <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto md:mx-0 mb-4">3</div>
                <div className="font-bold mb-2">Call</div>
                <div className="text-sm text-muted-foreground">A 45-minute scoping session with our lead operators.</div>
              </div>
            </div>
          </div>
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
