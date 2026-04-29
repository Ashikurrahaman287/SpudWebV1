import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Award, Trophy, Handshake } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const team = [
  { name: "AGT Venture", role: "Founder", group: "Leadership" },
  { name: "Ashikur Rahaman", role: "CEO", group: "Leadership" },
  { name: "Rockey Hassan", role: "Chief of Staff", group: "Leadership" },
  { name: "Afnan Turjo", role: "Head of Growth Engine", group: "Operating Leads" },
  { name: "LI Zhou", role: "Head of Liquidity & Exchange Partnerships", group: "Operating Leads" },
  { name: "Labib Rahman", role: "Head of Liquidity & Exchange Partnerships", group: "Operating Leads" },
  { name: "Jannatul Fardusi", role: "Customer Success & Launch Ops", group: "Operating Leads" },
  { name: "Afroza Fahim", role: "Design & Content Lead", group: "Build & Delivery" },
  { name: "Sharif Rahman", role: "Full Stack Developer", group: "Build & Delivery" },
  { name: "Faye Wong", role: "Data & Automation Engineer", group: "Build & Delivery" },
  { name: "Saiful Islam", role: "Social Media Manager", group: "Build & Delivery" },
];

const partners = [
  { name: "Ascendex", desc: "Exchange & listing partner" },
  { name: "BigONE", desc: "Exchange & listing partner" },
  { name: "Hotbit", desc: "Exchange & listing partner" },
  { name: "Tapbit", desc: "Exchange & listing partner" },
  { name: "Biconomy", desc: "Exchange & infra partner" },
  { name: "Goose Finance", desc: "Ecosystem partner" },
];

const recognitions = [
  {
    year: "2025",
    org: "Ascendex",
    category: "Innovation Excellence",
    award: "Outstanding Innovation Partner",
  },
  {
    year: "2024",
    org: "COPX",
    category: "Strategic Partnership",
    award: "Premier Strategic Alliance",
  },
  {
    year: "2023",
    org: "BigONE",
    category: "Business Management",
    award: "Best Business Management Team",
  },
  {
    year: "2022",
    org: "Tapbit",
    category: "Business Development",
    award: "Top Business Development Team",
  },
  {
    year: "2022",
    org: "MEXC",
    category: "Business Growth Award",
    award: "Business Growth Partner",
  },
  {
    year: "2021",
    org: "Hotbit",
    category: "CSR Award",
    award: "Best CSR Partner",
  },
];

const teamGroups = ["Leadership", "Operating Leads", "Build & Delivery"] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 border-b border-border bg-card/30 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at top right, hsl(var(--brand-violet) / 0.18), transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div
              variants={fadeUp}
              className="text-primary font-mono text-sm uppercase mb-4 tracking-wider"
            >
              Mission & Stance
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.05]"
            >
              Operators for launch-stage token projects.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              SpudBlocks exists because the current vendor ecosystem fails
              founders at their most critical moment. Agencies sell retainers;
              we engineer outcomes. We replace fragmented service providers with
              a unified, operator-grade execution layer.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 max-w-2xl">
            <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-4">
              The Operating Core
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              A small senior team. No junior account managers.
            </h2>
            <p className="text-muted-foreground text-lg">
              You work directly with the operators executing your launch — from
              founder and CEO down to the engineers building your sale flow.
            </p>
          </div>

          <div className="space-y-14">
            {teamGroups.map((group) => {
              const members = team.filter((m) => m.group === group);
              return (
                <div key={group}>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="h-px w-8"
                      style={{
                        background:
                          "linear-gradient(90deg, hsl(var(--brand-blue)), hsl(var(--brand-violet)))",
                      }}
                    />
                    <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      {group}
                    </span>
                  </div>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={staggerContainer}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {members.map((member) => (
                      <motion.div
                        key={member.name}
                        variants={fadeUp}
                        className="border border-border bg-card p-6 group hover:border-primary/50 transition-colors"
                      >
                        <div
                          className="w-12 h-12 flex items-center justify-center font-mono font-bold text-primary-foreground mb-5 text-sm tracking-wider"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-violet)) 60%, hsl(var(--brand-purple)))",
                          }}
                        >
                          {initials(member.name)}
                        </div>
                        <h3 className="font-bold text-base mb-1.5 group-hover:text-primary transition-colors leading-tight">
                          {member.name}
                        </h3>
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider leading-snug">
                          {member.role}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div className="lg:col-span-1">
              <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-4">
                Partners
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                Direct lines. Cleared requirements.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We maintain working relationships with exchanges, market makers,
                and ecosystem partners. We do not sell introductions. We
                prepare your project to clear their requirements before the
                first call.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Handshake className="w-4 h-4 text-primary" />
                <span>Active partner channels across listings and ecosystem</span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
                {partners.map((p) => (
                  <div
                    key={p.name}
                    className="bg-card p-6 hover:bg-muted/30 transition-colors group"
                  >
                    <div
                      className="font-mono font-bold text-base md:text-lg tracking-tight mb-2 group-hover:text-primary transition-colors"
                    >
                      {p.name.toUpperCase()}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      {p.desc}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Partners shown represent operational integration points. Listing
                and market access decisions are made by the relevant venues. See{" "}
                <Link
                  href="/legal/disclosures"
                  className="text-primary hover:underline"
                >
                  exchange pathway disclosure
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recognitions */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 max-w-2xl">
            <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Our Humble Recognitions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Selected awards across exchange and ecosystem partners.
            </h2>
            <p className="text-muted-foreground text-lg">
              Recognized for partnership quality, business development, and
              long-term operating discipline rather than vanity badges.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="border border-border"
          >
            {recognitions.map((r, i) => (
              <motion.div
                key={`${r.org}-${r.year}-${i}`}
                variants={fadeUp}
                className="grid grid-cols-12 gap-4 md:gap-8 items-start md:items-center px-5 md:px-8 py-6 border-b border-border last:border-b-0 bg-card hover:bg-muted/20 transition-colors group"
              >
                <div className="col-span-3 md:col-span-1 font-mono text-2xl md:text-3xl font-bold tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-violet)))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {r.year}
                </div>
                <div className="col-span-9 md:col-span-3 font-mono text-sm md:text-base font-bold tracking-wider uppercase text-foreground">
                  {r.org}
                </div>
                <div className="col-span-12 md:col-span-4 text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-mono">
                  {r.category}
                </div>
                <div className="col-span-12 md:col-span-4 text-base md:text-lg font-medium text-foreground flex items-center gap-3">
                  <Award className="w-4 h-4 text-primary shrink-0" />
                  <span>{r.award}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-6 text-xs text-muted-foreground max-w-3xl">
            Recognitions reflect partner-issued program awards. They do not
            constitute endorsement of any specific token, listing, or
            investment outcome. See{" "}
            <Link href="/legal/disclosures" className="text-primary hover:underline">
              full disclosures
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 border-b border-border relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--brand-blue)) 0%, hsl(var(--brand-violet)) 55%, hsl(var(--brand-purple)) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10 text-white">
          <div className="text-white/80 font-mono text-sm uppercase mb-8 tracking-wider">
            Manifesto
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
            "Your community size means nothing if 90% of them fail compliance
            checks at the finish line."
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We reject vanity metrics, fragmented agencies, and unexecutable
            roadmaps. We build for founders who understand that TGE is an
            operational crucible, not a marketing event.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">
            Ready to execute?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
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
              <Link href="/work">See Outcomes</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
