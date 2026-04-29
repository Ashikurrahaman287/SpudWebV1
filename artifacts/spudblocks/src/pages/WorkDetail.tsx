import { useRoute, Link } from "wouter";
import { casesData } from "@/data/cases";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WorkDetail() {
  const [, params] = useRoute("/work/:slug");
  const caseData = casesData.find(c => c.slug === params?.slug);

  if (!caseData) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Case not found</h1>
        <Button asChild variant="outline"><Link href="/work">View All Work</Link></Button>
      </div>
    );
  }

  const related = casesData.filter(c => c.slug !== caseData.slug).slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-12 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <Link href="/work" className="inline-flex items-center text-sm font-mono text-muted-foreground hover:text-primary uppercase tracking-wider mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Outcomes
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="text-xs font-mono text-primary uppercase tracking-wider border border-primary/30 bg-primary/10 px-3 py-1">{caseData.category}</div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider border border-border bg-muted/50 px-3 py-1">{caseData.stage}</div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">{caseData.project}</h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mb-12 leading-relaxed">{caseData.summary}</p>
        </div>
      </section>

      {/* KPI Band */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {caseData.heroMetrics.map(m => (
              <div key={m.label} className="py-8 md:px-8 first:md:pl-0 last:md:pr-0">
                <div className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-2">{m.value}</div>
                <div className="text-sm font-bold uppercase tracking-wider mb-1">{m.label}</div>
                <div className="text-xs text-muted-foreground">{m.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter mb-6 border-b border-border pb-4">Situation</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{caseData.situation}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold tracking-tighter mb-6 border-b border-border pb-4">Scope Delivered</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{caseData.scope}</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {caseData.artifacts.map((art, i) => (
                  <div key={i} className="p-4 border border-border bg-card flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3 shrink-0" />
                    <span className="font-medium text-sm">{art}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tighter mb-6 border-b border-border pb-4">Impact</h2>
              <div className="h-[300px] w-full mt-8 border border-border bg-card p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={caseData.beforeAfter} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="metric" stroke="#888" tick={{fontSize: 12}} />
                    <YAxis stroke="#888" tick={{fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: any, name: string, props: any) => [`${value} ${props.payload.unit}`, name]}
                    />
                    <Bar dataKey="before" name="Before SpudBlocks" fill="#333" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="after" name="After Execution" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="border border-border bg-card p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-primary mb-6">Timeline</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-0.5 before:bg-border">
                {caseData.timelineMilestones.map((ms, i) => (
                  <div key={i} className="relative flex items-start">
                    <div className="w-6 h-6 rounded-full border-2 border-background bg-muted shrink-0 mr-4 mt-0.5 z-10" />
                    <div>
                      <div className="font-bold text-sm">{ms.phase} <span className="text-muted-foreground font-normal ml-2">({ms.weeks}w)</span></div>
                      <div className="text-sm text-muted-foreground mt-1">{ms.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="border-l-4 border-primary pl-6 py-2">
              <p className="text-lg italic font-medium mb-4">"{caseData.quote.text}"</p>
              <footer className="text-sm">
                <strong className="block">{caseData.quote.author}</strong>
                <span className="text-muted-foreground">{caseData.quote.role}, {caseData.project}</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold tracking-tighter">Similar Outcomes</h3>
            <Button asChild variant="ghost" className="font-mono text-xs uppercase"><Link href="/work">View All</Link></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {related.map(c => (
              <Link key={c.slug} href={`/work/${c.slug}`} className="border border-border bg-card p-6 block hover:border-primary/50 transition-colors group">
                <div className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">{c.category}</div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{c.project}</h4>
                <p className="text-sm text-muted-foreground">{c.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 border-t border-border bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Require similar execution?</h2>
          <Button asChild size="lg" variant="secondary" className="h-12 px-8 font-mono uppercase tracking-wider text-sm">
            <Link href="/apply">Apply for Review</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
