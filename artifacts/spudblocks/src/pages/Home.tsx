import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Zap,
  Rocket,
  Users,
  Building2,
  Network,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const proofMetrics = [
  { value: "$84M+", label: "Assisted in Raises" },
  { value: "12", label: "Token Launches Supported" },
  { value: "94%", label: "KYC Completion Rate" },
  { value: "31", label: "Countries Reached" },
  { value: "180k+", label: "Qualified Community" },
  { value: "8", label: "Exchange Relationships" },
];

const featuredCases = [
  {
    slug: "defi-protocol-pre-tge",
    project: "Aura Finance",
    category: "DeFi Protocol",
    stage: "Pre-TGE",
    metrics: [
      { value: "$40M", label: "TVL Secured" },
      { value: "3.5x", label: "Oversubscribed" },
      { value: "84%", label: "KYC Rate" },
    ],
    blurb:
      "Restructured tokenomics, launch sequence, and dashboard for a yield aggregator pre-TGE.",
  },
  {
    slug: "l2-ecosystem-launch",
    project: "Nexus Network",
    category: "L2 Ecosystem",
    stage: "Mainnet Launch",
    metrics: [
      { value: "$5M", label: "Grants Distributed" },
      { value: "850", label: "Active Builders" },
      { value: "34", label: "Live DApps" },
    ],
    blurb:
      "Built developer portal, grant program, and technical narrative for a high-throughput L2.",
  },
  {
    slug: "rwa-infra-protocol",
    project: "YieldBase",
    category: "RWA / Infra",
    stage: "Institutional Round",
    metrics: [
      { value: "$22M", label: "Institutional Raise" },
      { value: "11", label: "Anchor LPs" },
      { value: "6", label: "Jurisdictions" },
    ],
    blurb:
      "Coordinated compliance posture, partner narrative, and liquidity prep for an RWA protocol.",
  },
];

const ecosystemLogos = [
  "REPUBLIC",
  "FJORD",
  "COINLIST",
  "OUTLIER",
  "IMPOSSIBLE",
  "CV LABS",
  "ANIMOCA",
  "MARKETACROSS",
];

const audiences = [
  {
    icon: Rocket,
    title: "Pre-TGE Founders",
    desc: "Operators with a defined launch window and a serious roadmap.",
  },
  {
    icon: Users,
    title: "Token Teams",
    desc: "Active projects needing traction, sale ops, and community discipline.",
  },
  {
    icon: Building2,
    title: "Exchanges",
    desc: "Listing and BD partners evaluating projects for market access.",
  },
  {
    icon: Network,
    title: "Ecosystems",
    desc: "L1/L2 foundations and grant programs needing portfolio readiness.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--brand-violet)/0.18),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--brand-blue)/0.12),_transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 flex items-center gap-2 font-mono text-sm tracking-wider uppercase"
              style={{ color: "hsl(var(--brand-violet))" }}
            >
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--brand-blue)), hsl(var(--brand-violet)))",
                }}
              />
              <span>Operator-Grade Launch Discipline</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.05]"
            >
              From launch chaos to{" "}
              <br className="hidden md:block" />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--brand-blue)), hsl(var(--brand-violet)) 60%, hsl(var(--brand-purple)))",
                }}
              >
                exchange readiness.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              SpudBlocks helps pre-TGE founders and token teams move from launch
              planning and site build to traction, market readiness, and
              strategic partner alignment. One integrated operating layer.
              Outcomes, not services.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 font-mono uppercase tracking-wider text-sm group"
              >
                <Link href="/apply">
                  Apply for Review
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 font-mono uppercase tracking-wider text-sm"
              >
                <Link href="/work">View Outcomes</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* KPI Proof Bar */}
      <section className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
            {proofMetrics.map((kpi, i) => (
              <div key={i} className="space-y-2 border-l-2 border-primary/30 pl-4">
                <div className="text-2xl md:text-3xl font-bold text-foreground font-mono tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Diagram Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 md:mb-24 max-w-2xl">
            <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-4">
              The Launch System
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
              Build, Traction, and Readiness as one operating layer.
            </h2>
            <p className="text-lg text-muted-foreground">
              Three coordinated pillars. One delivery cadence. Founders see what
              gets built, what gets measured, and what gates must be passed
              before market entry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Zap,
                title: "Build Phase",
                stage: "01",
                desc: "Websites, dashboards, token-sale UX, KYC-ready flows, vesting comms, and launch collateral engineered for conversion.",
                link: "/solutions/launch-system",
              },
              {
                icon: BarChart3,
                title: "Traction Engine",
                stage: "02",
                desc: "Narrative design, campaign systems, community activation, and reporting cadence built for projects that need traction, not vanity metrics.",
                link: "/solutions/growth-engine",
              },
              {
                icon: ShieldCheck,
                title: "Exchange Readiness",
                stage: "03",
                desc: "Readiness scorecards, compliance posture inputs, liquidity prep, and partner-facing market entry discipline.",
                link: "/solutions/exchange-readiness",
              },
            ].map((pillar, i) => (
              <Link key={i} href={pillar.link} className="block group">
                <div className="h-full p-8 border border-border bg-card hover:border-primary/60 transition-all relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, hsl(var(--brand-violet)), transparent)",
                    }}
                  />
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center">
                      <pillar.icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground tracking-wider">
                      {pillar.stage}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                  <div className="mt-8 flex items-center text-sm font-mono text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Outcomes */}
      <section className="py-24 md:py-32 border-t border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-4">
                Selected Outcomes
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                Proof before promise.
              </h2>
              <p className="text-lg text-muted-foreground">
                Every engagement should show the brief, the blockers, the
                operating plan, and the verified result.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="font-mono uppercase tracking-wider text-xs self-start md:self-auto"
            >
              <Link href="/work">
                View All Cases <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {featuredCases.map((c) => (
              <motion.div key={c.slug} variants={fadeUp}>
                <Link href={`/work/${c.slug}`} className="block group h-full">
                  <div className="h-full flex flex-col p-7 border border-border bg-background hover:border-primary/60 transition-all">
                    <div className="flex items-center gap-2 mb-5 text-xs font-mono uppercase tracking-wider">
                      <span
                        className="px-2 py-1 border"
                        style={{
                          color: "hsl(var(--brand-violet))",
                          borderColor: "hsl(var(--brand-violet) / 0.3)",
                          backgroundColor: "hsl(var(--brand-violet) / 0.08)",
                        }}
                      >
                        {c.category}
                      </span>
                      <span className="text-muted-foreground">{c.stage}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {c.project}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                      {c.blurb}
                    </p>

                    <div className="grid grid-cols-3 gap-3 mt-auto pt-6 border-t border-border">
                      {c.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-lg font-bold font-mono tracking-tight">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Logo / Ecosystem Wall */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
              Operating in the same circles as
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-x-6 gap-y-8 items-center">
            {ecosystemLogos.map((name, i) => (
              <div
                key={i}
                className="font-mono text-sm md:text-base tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors text-center select-none"
              >
                {name}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground/60 mt-10 max-w-2xl mx-auto">
            Reference set used for benchmarking site standards. Not an
            endorsement or commercial relationship unless disclosed in a case
            study.
          </p>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 max-w-2xl">
            <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-4">
              Who We Serve
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Built for token teams under launch pressure.
            </h2>
            <p className="text-lg text-muted-foreground">
              Optimized for serious operators with a defined window. We do not
              run idea-stage incubation or generic Web3 marketing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audiences.map((a, i) => (
              <div
                key={i}
                className="p-6 border border-border bg-card hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-5 text-primary border border-primary/30 bg-primary/5">
                  <a.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/who-we-serve"
              className="inline-flex items-center text-sm font-mono uppercase tracking-wider text-primary hover:opacity-80 transition-opacity"
            >
              See fit criteria <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Qualification CTA Strip */}
      <section className="border-t border-border relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "linear-gradient(120deg, hsl(var(--brand-blue) / 0.15) 0%, hsl(var(--brand-violet) / 0.18) 50%, hsl(var(--brand-purple) / 0.15) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="font-mono text-xs tracking-wider uppercase text-primary mb-4">
              Launch Readiness Review
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-[1.1]">
              If your TGE window is real, we should be talking now.
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Apply for a confidential review. We respond within 48 hours, run a
              short qualification call, and tell you honestly whether SpudBlocks
              is the right operating partner for your launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 font-mono uppercase tracking-wider text-sm group"
              >
                <Link href="/apply">
                  Apply for Review
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 font-mono uppercase tracking-wider text-sm bg-background/40 backdrop-blur-sm"
              >
                <Link href="/method">See the Method</Link>
              </Button>
            </div>
            <p className="mt-8 text-xs text-muted-foreground font-mono">
              Confidential by default. No NDAs required to begin a conversation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
