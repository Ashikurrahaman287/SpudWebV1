import { useEffect, useMemo } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/storage";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => (slug ? getBlogPostBySlug(slug) : undefined), [slug]);

  useEffect(() => {
    if (!post) return;
    document.title = post.metaTitle || `${post.title} — SpudBlocks`;
    let el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "description");
      document.head.appendChild(el);
    }
    el.setAttribute("content", post.metaDescription || post.title);
  }, [post]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-32 pb-20">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Post not found</h1>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const related = getBlogPosts()
    .filter((p) => p.slug !== post.slug && p.status === "published")
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <article>
        <header className="pt-32 pb-12 border-b border-border relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at top, hsl(var(--brand-violet) / 0.18), transparent 60%)",
            }}
          />
          <div className="container mx-auto px-4 md:px-6 max-w-3xl relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 font-mono uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-5">
                {post.category && (
                  <span
                    className="px-2 py-0.5 border"
                    style={{
                      color: "hsl(var(--brand-violet))",
                      borderColor: "hsl(var(--brand-violet) / 0.4)",
                      backgroundColor: "hsl(var(--brand-violet) / 0.08)",
                    }}
                  >
                    {post.category}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.08] mb-6">
                {post.title}
              </h1>

              {post.metaDescription && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.metaDescription}
                </p>
              )}
            </motion.div>
          </div>
        </header>

        {post.featuredImage && (
          <div className="border-b border-border">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl py-8">
              <div className="aspect-[16/9] overflow-hidden bg-muted border border-border">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 md:px-6 max-w-3xl py-16">
          <div className="prose prose-invert max-w-none">
            {post.content.split("\n\n").map((para, i) => {
              const trimmed = para.trim();
              if (trimmed.startsWith("# ")) {
                return (
                  <h2 key={i} className="text-3xl font-bold tracking-tighter mt-12 mb-4">
                    {trimmed.slice(2)}
                  </h2>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h3 key={i} className="text-2xl font-bold tracking-tighter mt-10 mb-3">
                    {trimmed.slice(3)}
                  </h3>
                );
              }
              if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n").map((l) => l.replace(/^- /, ""));
                return (
                  <ul key={i} className="list-disc pl-6 my-5 space-y-2 text-foreground/90">
                    {items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-base md:text-lg text-foreground/90 leading-relaxed my-5">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <Tag className="w-3 h-3" />
                {post.tags.map((t) => (
                  <span key={t} className="px-2 py-1 border border-border bg-card">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-card/30">
          <div className="container mx-auto px-4 md:px-6 py-16">
            <h2 className="text-2xl font-bold tracking-tighter mb-8">More from the blog</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="block p-6 border border-border bg-card hover:border-primary/60 transition-colors group sb-card-hover"
                >
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                    {p.category}
                  </div>
                  <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
