import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const radarData = [
  { subject: 'Product', A: 85, fullMark: 100 },
  { subject: 'Narrative', A: 65, fullMark: 100 },
  { subject: 'Community', A: 70, fullMark: 100 },
  { subject: 'Sale Ops', A: 80, fullMark: 100 },
  { subject: 'Market Entry', A: 60, fullMark: 100 },
];

export default function ExchangeReadiness() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }} className="max-w-4xl">
            <motion.div variants={fadeUp} className="text-primary font-mono text-sm uppercase mb-4 tracking-wider">Solution Pillar</motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              Exchange Readiness.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Tier 1 exchanges reject 95% of applicants. We ensure your compliance, liquidity strategy, and narrative are flawless before you ever make the introduction.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button asChild size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm">
                <Link href="/apply">Score Your Readiness</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-6">The Readiness Radar</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We quantifiably score projects across five core dimensions that exchanges evaluate. Weakness in a single dimension can kill a listing.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Product Maturity", desc: "Live testnet/mainnet, audited contracts, active users." },
                  { title: "Narrative Alignment", desc: "Clear positioning, not competing in saturated, hype-driven narratives." },
                  { title: "Community Quality", desc: "Verifiable, non-botted engagement and high KYC conversion rates." },
                  { title: "Sale Operations", desc: "Clean cap table, logical vesting, secure sale infrastructure." },
                  { title: "Market Entry", desc: "Legal memos, MM agreements, initial liquidity depth strategy." }
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-primary pl-4">
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border border-border bg-card p-8 h-[500px] flex flex-col">
              <div className="text-sm font-mono text-foreground uppercase mb-4 tracking-wider flex justify-between items-center">
                Sample Client Scorecard
                <span className="text-xs text-primary bg-primary/10 px-2 py-1">Needs Remediation</span>
              </div>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12, fontFamily: 'monospace' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Project X" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Required Inputs & Framework</h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { title: "Token Utility", desc: "Clear, defensible sink and source mechanics." },
              { title: "Vesting Logic", desc: "No massive unlocks that dump on retail." },
              { title: "Compliance", desc: "KYC/AML flows and jurisdictional blocks." },
              { title: "Legal Memos", desc: "Token classification opinions from top-tier counsel." }
            ].map((item, i) => (
              <div key={i} className="border border-border bg-card p-6">
                <div className="text-primary font-mono text-lg font-bold mb-2">0{i+1}</div>
                <div className="font-bold mb-2">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold tracking-tighter mb-6">Common Failure Modes</h3>
            <div className="space-y-4">
              {[
                { title: "Approaching too early", desc: "Pitching before testnet traction exists burns your only introduction." },
                { title: "Unrealistic FDV", desc: "Exchanges want volume. High FDVs with low floats stifle trading activity." },
                { title: "Messy Cap Tables", desc: "Too many small seed investors with fast vesting schedules." },
                { title: "Lack of MM Strategy", desc: "No committed market maker to provide day-1 order book depth." },
                { title: "Poor Legal Posture", desc: "No jurisdictional strategy for restricted regions." }
              ].map((mode, i) => (
                <div key={i} className="flex gap-4 p-4 border border-border bg-card">
                  <div className="text-destructive font-mono font-bold">{i+1}.</div>
                  <div>
                    <div className="font-bold text-sm mb-1">{mode.title}</div>
                    <div className="text-sm text-muted-foreground">{mode.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-start gap-4 p-6 border border-border max-w-4xl mx-auto text-sm text-muted-foreground">
            <Info className="w-5 h-5 shrink-0 text-foreground" />
            <div>
              <strong className="text-foreground font-mono uppercase tracking-wider block mb-2">Disclosure</strong>
              Any reference to exchange readiness, exchange introductions, or market-entry support describes advisory and preparation services only. Final listing decisions, compliance determinations, and market-access approvals are made solely by the relevant third-party venues and counterparties. SpudBlocks does not guarantee listings.
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Get your readiness score.</h2>
          <Button asChild size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm group">
            <Link href="/apply">
              Request Confidential Assessment
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
