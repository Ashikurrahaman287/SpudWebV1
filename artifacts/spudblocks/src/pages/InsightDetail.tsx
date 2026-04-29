import { useRoute, Link } from "wouter";
import { getInsights } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function InsightDetail() {
  const [, params] = useRoute("/insights/:slug");
  const insightsData = getInsights();
  const insight = insightsData.find(i => i.slug === params?.slug);

  if (!insight) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Button asChild variant="outline">
          <Link href="/insights">Return to Insights</Link>
        </Button>
      </div>
    );
  }

  const related = insightsData.filter(i => i.slug !== insight.slug).slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <article className="pt-32 pb-20">
        <header className="container mx-auto px-4 md:px-6 max-w-3xl mb-16">
          <Link href="/insights" className="inline-flex items-center text-sm font-mono text-muted-foreground hover:text-primary uppercase tracking-wider mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Notes
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-primary uppercase tracking-wider">{insight.category}</span>
            <span className="text-xs text-muted-foreground flex items-center"><Clock className="w-3 h-3 mr-1" /> {insight.readMinutes} min read</span>
            <span className="text-xs text-muted-foreground">{insight.publishedDate}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-[1.1]">{insight.title}</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{insight.subtitle}</p>
          
          <div className="flex items-center gap-4 pt-8 border-t border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-mono">
              {insight.author.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <div className="font-bold">{insight.author.name}</div>
              <div className="text-sm text-muted-foreground font-mono uppercase tracking-wider">{insight.author.role}</div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 md:p-8 bg-card border border-border mb-12"
          >
            <strong className="block mb-3 font-mono uppercase text-sm text-primary tracking-wider">TL;DR</strong>
            <p className="text-lg leading-relaxed">{insight.tldr}</p>
          </motion.div>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-p:leading-relaxed prose-a:text-primary">
            {insight.body.map((block, idx) => {
              if (block.type === 'heading') return <h2 key={idx} className="mt-12 mb-6">{block.content}</h2>;
              if (block.type === 'paragraph') return <p key={idx} className="mb-6 text-muted-foreground">{block.content}</p>;
              if (block.type === 'quote') return <blockquote key={idx} className="border-l-4 border-primary pl-6 py-2 my-8 text-xl italic font-medium bg-primary/5">{block.content}</blockquote>;
              if (block.type === 'callout') return (
                <div key={idx} className="p-6 my-8 border border-border bg-card font-mono text-sm uppercase tracking-wider">
                  <span className="text-primary font-bold mr-2">Operator Rule:</span> 
                  {block.content.replace('Operator Rule:', '').trim()}
                </div>
              );
              if (block.type === 'chartPlaceholder') return (
                <div key={idx} className="my-12 p-8 border border-border bg-card/50 flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <div className="font-mono text-sm uppercase tracking-wider mb-2">Figure: {block.content}</div>
                  <div className="text-xs">Data visualization omitted in plain-text view</div>
                </div>
              );
              return null;
            })}
          </div>

          <div className="my-16 p-8 border border-border bg-card text-center">
            <h3 className="text-2xl font-bold mb-4">Stop guessing. Start executing.</h3>
            <p className="text-muted-foreground mb-6">Let's audit your launch readiness.</p>
            <Button asChild className="font-mono uppercase tracking-wider text-sm">
              <Link href="/apply">Apply for Review</Link>
            </Button>
          </div>

          <div className="pt-8 mt-16 border-t border-border text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> Content is for informational purposes only and does not constitute financial, legal, or investment advice.
          </div>
        </div>
      </article>

      <section className="py-24 border-t border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h3 className="text-2xl font-bold tracking-tighter mb-8">Continue Reading</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map(i => (
              <Link key={i.slug} href={`/insights/${i.slug}`} className="border border-border bg-card p-6 block hover:border-primary/50 transition-colors">
                <div className="text-xs font-mono text-primary mb-3 uppercase tracking-wider">{i.category}</div>
                <h4 className="text-lg font-bold mb-2">{i.title}</h4>
                <div className="text-sm text-muted-foreground">By {i.author.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
