import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { casesData } from "@/data/cases";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Solutions() {
  const featuredCase = casesData[0];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <div className="text-primary font-mono text-sm uppercase mb-4 tracking-wider">Operating Model</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">Integrated execution. <br/>Zero vendor bloat.</h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              We replace fragmented agencies with a unified operating layer. Build, traction, and readiness executed in parallel.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm">
                <Link href="/apply">Apply for Review</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-b border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { title: "Launch System", desc: "High-conversion token sale UX, KYC flows, and technical launch infrastructure.", link: "/solutions/launch-system", items: ["Sale Dashboard", "KYC Integration", "Vesting Contracts"] },
               { title: "Growth Engine", desc: "Narrative design, community activation loops, and verifiable traction metrics.", link: "/solutions/growth-engine", items: ["Narrative Playbook", "Community Loops", "Growth Dashboard"] },
               { title: "Exchange Readiness", desc: "Compliance inputs, liquidity planning, and Tier 1 listing preparation.", link: "/solutions/exchange-readiness", items: ["Readiness Radar", "Compliance Docs", "Liquidity Strategy"] }
             ].map(s => (
               <Link key={s.title} href={s.link} className="p-8 border border-border bg-card hover:border-primary/50 transition-colors group block relative overflow-hidden">
                 <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{s.title}</h3>
                 <p className="text-muted-foreground mb-8">{s.desc}</p>
                 <ul className="space-y-3 mb-8">
                   {s.items.map(item => (
                     <li key={item} className="flex items-center text-sm">
                       <CheckCircle2 className="w-4 h-4 text-primary mr-3" />
                       {item}
                     </li>
                   ))}
                 </ul>
                 <div className="flex items-center text-sm font-mono text-primary uppercase opacity-0 group-hover:opacity-100 transition-opacity">Explore Capability <ArrowRight className="w-4 h-4 ml-2" /></div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Why fragmented vendors fail.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Hiring separate PR agencies, dev shops, and market makers creates silos. Narrative disconnects from product. Tech delays marketing. SpudBlocks integrates all three.
              </p>
              <div className="space-y-6">
                <div className="p-6 border border-border bg-card">
                  <div className="text-sm font-mono text-destructive uppercase mb-2">The Old Way</div>
                  <div className="font-bold mb-2">Piecemeal Vendor Stack</div>
                  <p className="text-sm text-muted-foreground">Multiple retainers, competing timelines, misaligned incentives. You manage the chaos.</p>
                </div>
                <div className="p-6 border border-primary/50 bg-primary/5">
                  <div className="text-sm font-mono text-primary uppercase mb-2">The SpudBlocks Way</div>
                  <div className="font-bold mb-2">Integrated Operating Layer</div>
                  <p className="text-sm text-muted-foreground">One unified team. Technical build, narrative growth, and exchange ops running in parallel.</p>
                </div>
              </div>
            </div>
            
            <div className="border border-border bg-card p-8">
               <div className="text-xs font-mono text-primary uppercase mb-4">Featured Outcome</div>
               <h3 className="text-2xl font-bold mb-4">{featuredCase.project}</h3>
               <p className="text-muted-foreground mb-6">{featuredCase.summary}</p>
               <div className="grid grid-cols-2 gap-4 mb-8">
                 {featuredCase.heroMetrics.slice(0,2).map(m => (
                   <div key={m.label}>
                     <div className="text-2xl font-mono font-bold">{m.value}</div>
                     <div className="text-xs text-muted-foreground uppercase">{m.label}</div>
                   </div>
                 ))}
               </div>
               <Button asChild variant="outline" className="w-full">
                 <Link href={`/work/${featuredCase.slug}`}>Read Case Study</Link>
               </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg">What is your typical engagement timeline?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Engagements typically run 90 to 120 days pre-TGE. We require a minimum of 60 days to properly execute technical builds, audit remediation, and community activation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg">Do you work on retainer or project basis?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                We operate on a milestone-based project model leading up to TGE. Post-TGE, we offer retained advisory for exchange relations and narrative maintenance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg">Do you accept token compensation?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes. We align our incentives with founders. A standard engagement consists of a fiat component to cover hard operational costs, plus a token allocation subject to identical vesting as the core team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-lg">Are you a market maker or exchange?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                No. We are an operational layer. We prepare you for tier 1 exchanges and market makers, ensuring your technical setup, compliance, and narrative meet their strict listing requirements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
