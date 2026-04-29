import { useState } from "react";
import { Link } from "wouter";
import { getInsights, deleteInsight } from "@/lib/storage";
import type { Insight } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

export default function AdminInsights() {
  const [insights, setInsights] = useState<Insight[]>(() => getInsights());
  const [query, setQuery] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = insights.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = (slug: string) => {
    deleteInsight(slug);
    setInsights(getInsights());
    setConfirmDelete(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tighter">Blog / Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">{insights.length} total</p>
        </div>
        <Button asChild className="font-mono uppercase tracking-wider text-xs">
          <Link href="/admin/insights/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search posts..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 bg-card" />
      </div>

      <div className="border border-border bg-card divide-y divide-border">
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground text-sm">No posts found.</div>
        )}
        {filtered.map((i) => (
          <div key={i.slug} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{i.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {i.category} · {i.publishedDate} · {i.readMinutes} min read · <span className="font-mono">/insights/{i.slug}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1 truncate max-w-lg">{i.subtitle}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <Button asChild variant="ghost" size="sm">
                <Link href={`/admin/insights/${i.slug}`}>
                  <Pencil className="w-4 h-4" />
                </Link>
              </Button>
              {confirmDelete === i.slug ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-400">Delete?</span>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(i.slug)}>Yes</Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>No</Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(i.slug)} className="text-muted-foreground hover:text-red-400">
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
