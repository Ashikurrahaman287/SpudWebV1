import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { getCaseBySlug, saveCase, getCases } from "@/lib/storage";
import type { CaseStudy } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "wouter";

const emptyCase: CaseStudy = {
  slug: "",
  project: "",
  category: "",
  stage: "",
  summary: "",
  situation: "",
  scope: "",
  timelineMilestones: [],
  beforeAfter: [],
  heroMetrics: [],
  quote: { text: "", author: "", role: "" },
  artifacts: [],
};

export default function AdminCaseStudyEdit() {
  const params = useParams<{ slug: string }>();
  const isNew = params.slug === "new";
  const [, navigate] = useLocation();
  const [form, setForm] = useState<CaseStudy>(emptyCase);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      const existing = getCaseBySlug(params.slug);
      if (existing) setForm(existing);
    }
  }, [params.slug, isNew]);

  const set = (key: keyof CaseStudy, value: unknown) =>
    setForm((f: CaseStudy) => ({ ...f, [key]: value }));

  const setQuote = (key: keyof CaseStudy["quote"], value: string) =>
    setForm((f: CaseStudy) => ({ ...f, quote: { ...f.quote, [key]: value } }));

  const handleSave = () => {
    setError("");
    if (!form.slug.trim()) return setError("Slug is required");
    if (!form.project.trim()) return setError("Project name is required");
    if (isNew) {
      const exists = getCases().some((c) => c.slug === form.slug);
      if (exists) return setError("A case study with this slug already exists");
    }
    saveCase(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    if (isNew) navigate(`/admin/case-studies/${form.slug}`);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/case-studies">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-mono tracking-tighter">
            {isNew ? "New Case Study" : `Edit: ${form.project}`}
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
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Slug (URL path) *</label>
              <Input value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="defi-protocol-launch" className="bg-background" disabled={!isNew} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Project Name *</label>
              <Input value={form.project} onChange={(e) => set("project", e.target.value)} placeholder="Aura Finance" className="bg-background" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Category</label>
              <Input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="DeFi Protocol" className="bg-background" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Stage</label>
              <Input value={form.stage} onChange={(e) => set("stage", e.target.value)} placeholder="Pre-TGE" className="bg-background" />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Summary</label>
            <Textarea value={form.summary} onChange={(e) => set("summary", e.target.value)} placeholder="One-line summary of the project..." className="bg-background min-h-[60px]" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Situation</label>
            <Textarea value={form.situation} onChange={(e) => set("situation", e.target.value)} placeholder="Describe the problem/situation..." className="bg-background min-h-[80px]" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Scope</label>
            <Textarea value={form.scope} onChange={(e) => set("scope", e.target.value)} placeholder="What we built / delivered..." className="bg-background min-h-[80px]" />
          </div>
        </section>

        <section className="border border-border bg-card p-6 space-y-4">
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">Hero Metrics</h2>
          <p className="text-xs text-muted-foreground">Enter metrics as JSON array: {`[{"label":"TVL","value":"$40M","sublabel":"Pre-launch"}]`}</p>
          <Textarea
            value={JSON.stringify(form.heroMetrics, null, 2)}
            onChange={(e) => {
              try { set("heroMetrics", JSON.parse(e.target.value)); } catch { /* ignore */ }
            }}
            className="bg-background font-mono text-xs min-h-[120px]"
          />
        </section>

        <section className="border border-border bg-card p-6 space-y-4">
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">Before / After Metrics</h2>
          <p className="text-xs text-muted-foreground">JSON: {`[{"metric":"Leads","before":500,"after":12000,"unit":"users"}]`}</p>
          <Textarea
            value={JSON.stringify(form.beforeAfter, null, 2)}
            onChange={(e) => {
              try { set("beforeAfter", JSON.parse(e.target.value)); } catch { /* ignore */ }
            }}
            className="bg-background font-mono text-xs min-h-[120px]"
          />
        </section>

        <section className="border border-border bg-card p-6 space-y-4">
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">Timeline Milestones</h2>
          <p className="text-xs text-muted-foreground">JSON: {`[{"phase":"Audit","weeks":2,"description":"Tech audit"}]`}</p>
          <Textarea
            value={JSON.stringify(form.timelineMilestones, null, 2)}
            onChange={(e) => {
              try { set("timelineMilestones", JSON.parse(e.target.value)); } catch { /* ignore */ }
            }}
            className="bg-background font-mono text-xs min-h-[120px]"
          />
        </section>

        <section className="border border-border bg-card p-6 space-y-4">
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">Quote</h2>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Quote Text</label>
            <Textarea value={form.quote.text} onChange={(e) => setQuote("text", e.target.value)} className="bg-background min-h-[80px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Author</label>
              <Input value={form.quote.author} onChange={(e) => setQuote("author", e.target.value)} className="bg-background" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Role</label>
              <Input value={form.quote.role} onChange={(e) => setQuote("role", e.target.value)} className="bg-background" />
            </div>
          </div>
        </section>

        <section className="border border-border bg-card p-6 space-y-4">
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">Deliverable Tags</h2>
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
          <Input value={form.artifacts.join(", ")} onChange={(e) => set("artifacts", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} placeholder="Dashboard, Vesting Contracts, Narrative Deck" className="bg-background" />
        </section>

        <div className="flex gap-3">
          <Button onClick={handleSave} className="font-mono uppercase tracking-wider text-xs">
            <Save className="w-4 h-4 mr-2" />
            {saved ? "Saved!" : "Save Case Study"}
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/case-studies">Cancel</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
