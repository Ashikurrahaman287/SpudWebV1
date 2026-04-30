import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, Calendar, ArrowRight, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getBlogPosts } from "@/lib/storage";
import { useSEO } from "@/lib/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function Blog() {
  useSEO("blog", {
    title: "Blog — SpudBlocks",
    description: "Web3 launch insights, tokenomics frameworks, and exchange-readiness analysis from the SpudBlocks operating team.",
  });

  const allPosts = useMemo(
    () => getBlogPosts().filter((p) => p.status === "published"),
    []
  );
  const categories = useMemo(() => {
    const set = new Set<string>();
    allPosts.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [allPosts]);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allPosts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.content.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-16 border-b border-border relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(var(--brand-violet) / 0.18), transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-3xl"
          >
            <div className="font-mono text-xs tracking-widest uppercase text-primary mb-4">
              Insights & Field Notes
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-[1.05]">
              The SpudBlocks Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Tactical thinking from inside live token launches — tokenomics,
              growth ops, liquidity strategy, and exchange-readiness moves.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="pl-9 bg-card"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    activeCategory === cat
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border bg-card/30">
              <h3 className="text-lg font-bold mb-2">No posts yet</h3>
              <p className="text-sm text-muted-foreground">
                Blog posts published by the team will appear here. Visit the
                admin panel to publish your first post.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <Link href={`/blog/${p.slug}`} className="group block h-full">
                    <article className="h-full flex flex-col border border-border bg-card hover:border-primary/60 transition-colors overflow-hidden sb-card-hover sb-card-lift sb-card-glow rounded-md">
                      <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                        {p.featuredImage ? (
                          <img
                            src={p.featuredImage}
                            alt={p.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(135deg, hsl(var(--brand-blue) / 0.3), hsl(var(--brand-violet) / 0.4))",
                            }}
                          />
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                          {p.category && (
                            <span
                              className="px-2 py-0.5 border"
                              style={{
                                color: "hsl(var(--brand-violet))",
                                borderColor: "hsl(var(--brand-violet) / 0.4)",
                                backgroundColor: "hsl(var(--brand-violet) / 0.08)",
                              }}
                            >
                              {p.category}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(p.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors leading-tight">
                          {p.title}
                        </h2>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-5">
                          {p.metaDescription || p.content.replace(/[#*_`>]/g, "").slice(0, 160)}
                        </p>
                        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                          {p.tags.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Tag className="w-3 h-3" />
                              {p.tags.slice(0, 2).join(", ")}
                            </div>
                          )}
                          <span className="ml-auto text-xs font-mono uppercase tracking-wider text-primary inline-flex items-center">
                            Read <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">
            Ready to launch your token project?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Skip the agency carousel. Apply for a confidential review with the
            SpudBlocks operating team.
          </p>
          <Button asChild size="lg" className="font-mono uppercase tracking-wider text-sm">
            <Link href="/apply">
              Apply for Launch <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
