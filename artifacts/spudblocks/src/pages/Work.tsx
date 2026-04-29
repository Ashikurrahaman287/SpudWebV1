import { Link } from "wouter";
import { casesData } from "@/data/cases";
import { motion } from "framer-motion";

export default function Work() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">Outcomes Delivered</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {casesData.map(c => (
            <Link key={c.slug} href={`/work/${c.slug}`} className="border border-border bg-card p-8 group block hover:border-primary/50 transition-colors">
              <div className="text-xs font-mono text-primary mb-2 uppercase">{c.category}</div>
              <h3 className="text-3xl font-bold mb-4">{c.project}</h3>
              <p className="text-muted-foreground mb-8">{c.summary}</p>
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-4">
                {c.heroMetrics.map(m => (
                  <div key={m.label}>
                    <div className="text-xl font-bold font-mono">{m.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
