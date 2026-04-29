import { useState } from "react";
import { Link } from "wouter";
import { insightsData } from "@/data/insights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BookOpen, Clock, Download } from "lucide-react";

export default function Insights() {
  const [filter, setFilter] = useState("All");
  const [emailStatus, setEmailStatus] = useState<"idle" | "success">("idle");

  const categories = ["All", "Launch Readiness", "Growth", "Exchange", "Tokenomics", "Operator Notes"];
  const featured = insightsData[0];
  
  const filteredInsights = filter === "All" 
    ? insightsData.slice(1) 
    : insightsData.filter(i => i.category === filter && i.slug !== featured.slug);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus("success");
    setTimeout(() => setEmailStatus("idle"), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-12 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Operator Notes.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-12">
            Field reports, frameworks, and tactical blueprints for executing flawless token launches.
          </p>

          <Link href={`/insights/${featured.slug}`} className="block border border-border bg-card group hover:border-primary/50 transition-colors overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">{featured.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1" /> {featured.readMinutes} min read</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-muted-foreground mb-8">{featured.subtitle}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                     {/* Initials fallback */}
                     <div className="w-full h-full flex items-center justify-center text-xs font-bold bg-primary/10 text-primary">
                       {featured.author.name.split(' ').map(n=>n[0]).join('')}
                     </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-bold">{featured.author.name}</div>
                    <div className="text-muted-foreground text-xs">{featured.publishedDate}</div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 border-l border-border flex items-center justify-center p-12 min-h-[300px]">
                 <BookOpen className="w-24 h-24 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-8 border-b border-border sticky top-16 bg-background/80 backdrop-blur z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-sm font-mono uppercase tracking-wider border transition-colors ${
                  filter === cat 
                    ? "bg-foreground text-background border-foreground" 
                    : "bg-card border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map(i => (
              <Link key={i.slug} href={`/insights/${i.slug}`} className="flex flex-col border border-border bg-card group hover:border-primary/50 transition-colors h-full">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xs font-mono text-primary uppercase tracking-wider">{i.category}</div>
                    <div className="text-xs text-muted-foreground">{i.readMinutes}m</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{i.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{i.subtitle}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="text-xs font-bold">{i.author.name}</div>
                    <div className="text-xs text-muted-foreground">{i.publishedDate}</div>
                  </div>
                </div>
              </Link>
            ))}
            
            {filteredInsights.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-border">
                No insights found for this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto border border-border bg-card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Operator Dispatch</h2>
            <p className="text-muted-foreground mb-8">
              Get our internal launch frameworks and field notes delivered monthly. No spam, just signal.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="work@email.com" required className="bg-background h-12" />
              <Button type="submit" className="h-12 font-mono uppercase tracking-wider" disabled={emailStatus === "success"}>
                {emailStatus === "success" ? "Subscribed" : "Subscribe"}
              </Button>
            </form>
          </div>
          
          <div className="max-w-2xl mx-auto mt-8 border border-border bg-primary/5 p-6 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/20 flex items-center justify-center text-primary">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold">The TGE Readiness Checklist</div>
                <div className="text-sm text-muted-foreground">Download the 50-point PDF</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </section>
    </div>
  );
}
