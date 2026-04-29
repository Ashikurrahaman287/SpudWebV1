import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { getInsightBySlug, saveInsight, getInsights } from "@/lib/storage";
import type { Insight } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "wouter";

const emptyInsight: Insight = {
  slug: "",
  title: "",
  subtitle: "",
  category: "",
  author: { name: "", role: "", headshotUrl: "" },
  publishedDate: new Date().toISOString().split("T")[0],
  readMinutes: 5,
  tldr: "",
  body: [],
};

export default function AdminInsightEdit() {
  const params = useParams<{ slug: string }>();
  const isNew = params.slug === "new";
  const [, navigate] = useLocation();
  const [form, setForm] = useState<Insight>(emptyInsight);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      const existing = getInsightBySlug(params.slug);
      if (existing) setForm(existing);
    }
  }, [params.slug, isNew]);

  const set = (key: keyof Insight, value: unknown) =>
    setForm((f: Insight) => ({ ...f, [key]: value }));

  const setAuthor = (key: keyof Insight["author"], value: string) =>
    setForm((f: Insight) => ({ ...f, author: { ...f.author, [key]: value } }));

  const handleSave = () => {
    setError("");
    if (!form.slug.trim()) return setError("Slug is required");
    if (!form.title.trim()) return setError("Title is required");
    if (isNew) {
      const exists = getInsights().some((i) => i.slug === form.slug);
      if (exists) return setError("A post with this slug already exists");
    }
    saveInsight(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    if (isNew) navigate(`/admin/insights/${form.slug}`);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/insights">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-mono tracking-tighter">
            {isNew ? "New Blog Post" : `Edit: ${form.title}`}
          </h1>
        </div>
        <Button onClick={handleSave} className="font-mono uppercase tracking-wider text-xs">
          <Save className="w-4 h-4 mr-2" />
          {saved ? "Saved!" : "Save"}
        </Button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4 p-3 border border-red-500/30 bg-red-500/10">{error}</p>}

      <div className="space-y-6">
        <section className="border border-border bg-card p-6 space-y-4">
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">Post Info</h2>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Slug (URL) *</label>
            <Input value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="token-launch-mistakes" className="bg-background" disabled={!isNew} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Title *</label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="5 Mistakes in Token Launches" className="bg-background" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Subtitle</label>
            <Input value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} placeholder="A deeper look at the problem..." className="bg-background" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Category</label>
              <Input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Launch Readiness" className="bg-background" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Publish Date</label>
              <Input type="date" value={form.publishedDate} onChange={(e) => set("publishedDate", e.target.value)} className="bg-background" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Read Time (mins)</label>
              <Input type="number" value={form.readMinutes} onChange={(e) => set("readMinutes", Number(e.target.value))} className="bg-background" />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">TL;DR</label>
            <Textarea value={form.tldr} onChange={(e) => set("tldr", e.target.value)} className="bg-background min-h-[80px]" placeholder="Short summary of the article..." />
          </div>
        </section>

        <section className="border border-border bg-card p-6 space-y-4">
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">Author</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Author Name</label>
              <Input value={form.author.name} onChange={(e) => setAuthor("name", e.target.value)} className="bg-background" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Role</label>
              <Input value={form.author.role} onChange={(e) => setAuthor("role", e.target.value)} className="bg-background" />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Headshot URL (optional)</label>
            <Input value={form.author.headshotUrl} onChange={(e) => setAuthor("headshotUrl", e.target.value)} className="bg-background" placeholder="/images/author.png" />
          </div>
        </section>

        <section className="border border-border bg-card p-6 space-y-4">
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">Body Content</h2>
          <p className="text-xs text-muted-foreground">
            JSON array of blocks. Types: <code>paragraph</code>, <code>heading</code>, <code>quote</code>, <code>callout</code>, <code>chartPlaceholder</code>
          </p>
          <p className="text-xs text-muted-foreground font-mono bg-muted p-2">
            {`[{"type":"heading","content":"My Section"},{"type":"paragraph","content":"Body text here."}]`}
          </p>
          <Textarea
            value={JSON.stringify(form.body, null, 2)}
            onChange={(e) => {
              try { set("body", JSON.parse(e.target.value)); } catch { /* ignore */ }
            }}
            className="bg-background font-mono text-xs min-h-[200px]"
          />
        </section>

        <div className="flex gap-3">
          <Button onClick={handleSave} className="font-mono uppercase tracking-wider text-xs">
            <Save className="w-4 h-4 mr-2" />
            {saved ? "Saved!" : "Save Post"}
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/insights">Cancel</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
