import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const methodPhases = [
  {
    num: "01",
    title: "Discovery & Readiness Audit",
    duration: "Week 1",
    inputs: ["Whitepaper/Docs", "Smart Contracts", "Tokenomics Model", "Cap Table"],
    deliverables: ["Gap Analysis Report", "Action Plan", "Exchange Readiness Score"],
    exit: "Approved timeline and scope of work."
  },
  {
    num: "02",
    title: "Build & Narrative Production",
    duration: "Weeks 2-5",
    inputs: ["Brand Assets", "Technical Architecture"],
    deliverables: ["Token Sale Dashboard", "KYC/KYB Integration", "Narrative Deck", "Launch Collateral"],
    exit: "Frontend deployed to testnet. Narrative locked."
  },
  {
    num: "03",
    title: "Traction Activation",
    duration: "Weeks 4-8",
    inputs: ["Community Channels", "Growth Budget"],
    deliverables: ["Community Quests", "On-chain Analytics Dashboard", "Content Engine Live"],
    exit: "Minimum qualified lead target reached."
  },
  {
    num: "04",
    title: "Readiness & Partner Prep",
    duration: "Weeks 6-8",
    inputs: ["Legal Memos", "Market Maker Terms"],
    deliverables: ["Exchange Data Room", "Liquidity Strategy", "Final Audits Confirmed"],
    exit: "Greenlight from exchanges/MMs."
  },
  {
    num: "05",
    title: "Reporting & Handoff",
    duration: "TGE + 2 Weeks",
    inputs: ["Live Market Data"],
    deliverables: ["War Room Operations", "Post-TGE Analytics", "Treasury Handoff"],
    exit: "Stable market operation. Retained advisory begins."
  }
];

export default function Method() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }} className="max-w-4xl">
            <motion.div variants={fadeUp} className="text-primary font-mono text-sm uppercase mb-4 tracking-wider">The Playbook</motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              The launch system behind the work.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              We execute a phased, rigorous operating model designed to eliminate blind spots, align narrative with product, and drive projects safely through TGE.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-12">Phased Dependency Model</h2>
          
          <div className="overflow-x-auto pb-8">
            <div className="min-w-[800px] border border-border bg-card p-6">
              <div className="flex text-xs font-mono text-muted-foreground uppercase border-b border-border pb-4 mb-4">
                <div className="w-1/5">Wk 1</div>
                <div className="w-1/5">Wk 2-3</div>
                <div className="w-1/5">Wk 4-5</div>
                <div className="w-1/5">Wk 6-7</div>
                <div className="w-1/5">Wk 8 (TGE)</div>
              </div>
              
              <div className="space-y-4">
                <div className="relative h-8">
                  <div className="absolute left-0 w-1/5 h-full bg-primary/20 border border-primary/50 flex items-center px-3 text-xs font-bold">Audit</div>
                </div>
                <div className="relative h-8">
                  <div className="absolute left-[10%] w-[40%] h-full bg-primary/40 border border-primary/70 flex items-center px-3 text-xs font-bold">Build & Narrative</div>
                </div>
                <div className="relative h-8">
                  <div className="absolute left-[30%] w-[50%] h-full bg-primary/60 border border-primary/80 flex items-center px-3 text-xs font-bold text-primary-foreground">Traction Activation</div>
                </div>
                <div className="relative h-8">
                  <div className="absolute left-[50%] w-[30%] h-full bg-primary/80 border border-primary flex items-center px-3 text-xs font-bold text-primary-foreground">Partner Prep</div>
                </div>
                <div className="relative h-8">
                  <div className="absolute left-[80%] w-[20%] h-full bg-primary border border-primary flex items-center px-3 text-xs font-bold text-primary-foreground">Execution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">The Operating Sequence</h2>
            <p className="text-muted-foreground">Detailed breakdown of deliverables and checkpoints.</p>
          </div>

          <div className="space-y-8">
            {methodPhases.map((phase, i) => (
              <div key={i} className="border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 shrink-0">
                  <div className="text-primary font-mono font-bold text-xl mb-2">{phase.num}</div>
                  <h3 className="text-2xl font-bold mb-2">{phase.title}</h3>
                  <div className="text-sm font-mono text-muted-foreground uppercase">{phase.duration}</div>
                </div>
                
                <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-mono text-foreground uppercase mb-3 border-b border-border pb-2">Inputs</div>
                    <ul className="space-y-2">
                      {phase.inputs.map(item => (
                        <li key={item} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">›</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-foreground uppercase mb-3 border-b border-border pb-2">Deliverables</div>
                    <ul className="space-y-2">
                      {phase.deliverables.map(item => (
                        <li key={item} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">›</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm:col-span-2 pt-4 border-t border-border">
                    <div className="text-xs font-mono text-primary uppercase mb-2">Exit Criterion</div>
                    <div className="font-bold text-sm">{phase.exit}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Method FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg">Can we compress the timeline to 4 weeks?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                No. Quality execution requires a minimum of 8 weeks. Compressing timelines leads to skipped security audits, incomplete KYC, and failed market entries. If your TGE is in 4 weeks, we recommend delaying it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg">Do we need to use your entire system?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                While our system is designed to be integrated, we do take on modular engagements (e.g., just the Technical Build or just Narrative Production) if your internal team is highly capable in the other pillars.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg">How involved does the founder need to be?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Highly involved in Weeks 1-2 for Discovery and Narrative locking. After Week 2, our operators execute the heavy lifting, requiring founder approval only at specific checkpoint gates.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-lg">What happens post-TGE?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                We transition to an advisory retainer focused on secondary exchange listings, liquidity management reporting, and narrative maintenance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Execute with precision.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm group">
              <Link href="/apply">
                Apply for Review
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm group">
              <Download className="mr-2 w-4 h-4" />
              Download Checklist
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
