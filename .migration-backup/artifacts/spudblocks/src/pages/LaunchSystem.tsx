import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Code2, Database, LayoutDashboard, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LaunchSystem() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <div className="text-primary font-mono text-sm uppercase mb-4 tracking-wider">Solution Pillar</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Launch System</h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Flawless technical execution. We engineer the dashboards, sale UX, and compliance flows required for a secure TGE.
            </p>
            <Button asChild size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm">
              <Link href="/apply">Request Build Audit</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-6">What gets built.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your smart contracts are audited, but your frontend sale UX is the actual attack vector for drop-off. We build operator-grade interfaces.
              </p>
              
              <div className="space-y-4">
                {[
                  "Token Sale / Presale Dashboards",
                  "Integrated KYC/KYB Conversion Flows",
                  "Vesting & Claim Interfaces",
                  "Real-time Analytics & Participant Tracking",
                  "Launch Collateral (Docs, FAQs, GitBooks)"
                ].map(item => (
                  <div key={item} className="flex items-center p-4 border border-border bg-card">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-4" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border border-border bg-card flex flex-col justify-center items-center text-center">
                <LayoutDashboard className="w-8 h-8 text-primary mb-4" />
                <div className="font-bold">Sale UX</div>
              </div>
              <div className="p-6 border border-border bg-card flex flex-col justify-center items-center text-center">
                <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                <div className="font-bold">Compliance</div>
              </div>
              <div className="p-6 border border-border bg-card flex flex-col justify-center items-center text-center">
                <Code2 className="w-8 h-8 text-primary mb-4" />
                <div className="font-bold">Web3 Integration</div>
              </div>
              <div className="p-6 border border-border bg-card flex flex-col justify-center items-center text-center">
                <Database className="w-8 h-8 text-primary mb-4" />
                <div className="font-bold">Data Tracking</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Delivery Timeline</h2>
            <p className="text-muted-foreground">Standard 8-week technical sprint pre-TGE.</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { week: "Weeks 1-2", title: "Architecture & UX Design", desc: "Mapping the user journey from landing page to KYC to smart contract interaction." },
              { week: "Weeks 3-5", title: "Frontend Build & Integration", desc: "Developing the React/Next.js application and connecting Web3 wallet adapters." },
              { week: "Weeks 6-7", title: "Testnet & Security Audit", desc: "Rigorous testing of the sale flow on testnet. Fixing any edge-case bugs." },
              { week: "Week 8", title: "Mainnet Deployment & TGE", desc: "Live deployment, war-room monitoring, and real-time analytics tracking." }
            ].map((phase, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {i+1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 border border-border bg-card shadow-sm">
                  <div className="text-sm font-mono text-primary mb-1 uppercase">{phase.week}</div>
                  <h3 className="font-bold text-lg mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
