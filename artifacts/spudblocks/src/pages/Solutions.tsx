import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Coins, Code2, TrendingUp, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSEO } from "@/lib/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const services = [
  {
    icon: Coins,
    stage: "01",
    title: "Token Launch Infrastructure",
    blurb: "End-to-end token go-to-market preparation engineered for serious teams.",
    items: [
      "Token launch planning",
      "Tokenomics support",
      "TGE preparation",
      "Launch strategy",
    ],
  },
  {
    icon: Code2,
    stage: "02",
    title: "Web3 Product Development",
    blurb: "Production-grade product builds that founders can actually ship.",
    items: [
      "DApps",
      "Web3 websites",
      "SaaS platforms",
      "Smart contract systems",
      "Dashboards",
    ],
  },
  {
    icon: TrendingUp,
    stage: "03",
    title: "Growth & Market Entry",
    blurb: "Verifiable demand, narrative, and audience before launch day.",
    items: [
      "Community growth",
      "KOL campaigns",
      "Airdrop strategy",
      "User acquisition",
      "Narrative positioning",
    ],
  },
  {
    icon: Building2,
    stage: "04",
    title: "Liquidity & Exchange Pathway",
    blurb: "From mainnet to listed — readiness, liquidity, and partner alignment.",
    items: [
      "Exchange readiness",
      "Liquidity planning",
      "Market maker coordination",
      "Listing preparation",
      "Post-launch support",
    ],
  },
];

export default function Solutions() {
  useSEO("services", {
    title: "Services — SpudBlocks",
    description:
      "Integrated infrastructure for Web3 launches: token launch, product, growth, and exchange pathway — under one operating partner.",
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 border-b border-border relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, hsl(var(--brand-violet) / 0.18), transparent 60%), radial-gradient(ellipse at bottom left, hsl(var(--brand-blue) / 0.15), transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <div className="font-mono text-xs tracking-widest uppercase text-primary mb-4">
              Services
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.05]">
              Integrated{" "}
              <span className="sb-headline-shimmer">Infrastructure</span>{" "}
              for Web3 Launches
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl leading-relaxed">
              Four core services. One coordinated operating layer. We replace
              fragmented agencies with a single team that ships your launch
              from idea to exchange.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm">
                <Link href="/apply">
                  Apply for Launch <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm">
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Service Cards */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6 md:gap-8"
          >
            {services.map((s) => (
              <motion.div key={s.title} variants={fadeUp}>
                <div className="sb-card-hover sb-card-lift relative h-full p-8 border border-border bg-card hover:border-primary/60 overflow-hidden group rounded-md">
                  <div
                    className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--brand-blue) / 0.4), transparent 30%, transparent 70%, hsl(var(--brand-violet) / 0.4))",
                      WebkitMask:
                        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: "1px",
                    }}
                  />

                  <div className="flex items-start justify-between mb-6 relative">
                    <div
                      className="w-14 h-14 flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--brand-blue) / 0.15), hsl(var(--brand-violet) / 0.2))",
                        border: "1px solid hsl(var(--brand-violet) / 0.4)",
                      }}
                    >
                      <s.icon
                        className="w-6 h-6"
                        style={{ color: "hsl(var(--brand-violet))" }}
                      />
                    </div>
                    <span
                      className="font-mono text-xs tracking-wider"
                      style={{ color: "hsl(var(--brand-violet) / 0.7)" }}
                    >
                      {s.stage}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{s.blurb}</p>

                  <ul className="space-y-3 mb-8">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start text-sm">
                        <CheckCircle2
                          className="w-4 h-4 mr-3 mt-0.5 shrink-0"
                          style={{ color: "hsl(var(--brand-violet))" }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant="outline"
                    className="font-mono uppercase tracking-wider text-xs"
                  >
                    <Link href="/apply">
                      Discuss Engagement <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why integrated */}
      <section className="py-24 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-xs tracking-widest uppercase text-primary mb-4">
                Why integrated
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-[1.1]">
                Fragmented vendors lose launches.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Hiring separate PR agencies, dev shops, and market makers creates
                silos. Narrative disconnects from product. Tech delays
                marketing. SpudBlocks operates all four functions in lockstep so
                your TGE doesn't slip.
              </p>
              <div className="space-y-4">
                <div className="p-5 border border-border bg-card">
                  <div className="text-xs font-mono text-destructive uppercase mb-1.5 tracking-wider">
                    The Old Way
                  </div>
                  <div className="font-bold mb-1">Piecemeal Vendor Stack</div>
                  <p className="text-sm text-muted-foreground">
                    Multiple retainers, competing timelines, misaligned
                    incentives. You manage the chaos.
                  </p>
                </div>
                <div className="p-5 border border-primary/50 bg-primary/5">
                  <div className="text-xs font-mono text-primary uppercase mb-1.5 tracking-wider">
                    The SpudBlocks Way
                  </div>
                  <div className="font-bold mb-1">Integrated Operating Layer</div>
                  <p className="text-sm text-muted-foreground">
                    One unified team. Token, product, growth, and exchange ops
                    running in parallel.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card p-8 relative overflow-hidden">
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-30 blur-3xl"
                style={{ background: "hsl(var(--brand-violet))" }}
              />
              <div className="text-xs font-mono text-primary uppercase mb-4 tracking-wider">
                Outcome Snapshot
              </div>
              <h3 className="text-2xl font-bold mb-6">From idea to listed token</h3>
              <div className="space-y-4">
                {[
                  { label: "Avg. engagement window", value: "90–120 days" },
                  { label: "Functions under one roof", value: "4" },
                  { label: "Qualified founders supported", value: "100+" },
                  { label: "Exchange relationships", value: "8 venues" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="text-sm text-muted-foreground">{row.label}</div>
                    <div className="font-mono font-bold text-foreground">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full mt-6 font-mono uppercase tracking-wider text-xs">
                <Link href="/case-studies">Explore Outcomes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <div className="font-mono text-xs tracking-widest uppercase text-primary mb-3">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Engagement & operating questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg">
                What is your typical engagement timeline?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Engagements typically run 90 to 120 days pre-TGE. We require a
                minimum of 60 days to properly execute technical builds, audit
                remediation, and community activation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg">
                Do you work on retainer or project basis?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                We operate on a milestone-based project model leading up to TGE.
                Post-TGE, we offer retained advisory for exchange relations and
                narrative maintenance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg">
                Do you accept token compensation?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes. We align our incentives with founders. A standard
                engagement consists of a fiat component to cover hard
                operational costs, plus a token allocation subject to identical
                vesting as the core team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-lg">
                Are you a market maker or exchange?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                No. We are an operating layer. We prepare you for tier-1
                exchanges and market makers, ensuring your technical setup,
                compliance, and narrative meet their listing requirements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
