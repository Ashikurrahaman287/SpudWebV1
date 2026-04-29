import { useState } from "react";
import { Link } from "wouter";
import { getCases, deleteCase } from "@/lib/storage";
import type { CaseStudy } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminCaseStudies() {
  const [cases, setCases] = useState<CaseStudy[]>(() => getCases());
  const [query, setQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = cases.filter(
    (c) =>
      c.project.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = (slug: string) => {
    deleteCase(slug);
    setCases(getCases());
    setConfirmDelete(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tighter">Case Studies</h1>
          <p className="text-sm text-muted-foreground mt-1">{cases.length} total</p>
        </div>
        <Button asChild className="font-mono uppercase tracking-wider text-xs">
          <Link href="/admin/case-studies/new">
            <Plus className="w-4 h-4 mr-2" />
            New Case Study
          </Link>
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search case studies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 bg-card"
        />
      </div>

      <div className="border border-border bg-card divide-y divide-border">
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground text-sm">No case studies found.</div>
        )}
        {filtered.map((c) => (
          <div key={c.slug} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{c.project}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {c.category} · {c.stage} · <span className="font-mono">/work/{c.slug}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1 truncate max-w-lg">{c.summary}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <Button asChild variant="ghost" size="sm">
                <Link href={`/admin/case-studies/${c.slug}`}>
                  <Pencil className="w-4 h-4" />
                </Link>
              </Button>
              {confirmDelete === c.slug ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-400">Delete?</span>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(c.slug)}>Yes</Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>No</Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(c.slug)} className="text-muted-foreground hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
