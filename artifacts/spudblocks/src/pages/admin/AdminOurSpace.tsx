import { useState } from "react";
import { getOurSpace, saveOurSpaceItem, deleteOurSpaceItem, OurSpaceItem } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, X, Youtube } from "lucide-react";

const emptyItem = (): OurSpaceItem => ({
  id: Date.now().toString(),
  title: "",
  description: "",
  imageUrl: "",
  youtubeUrl: "",
  createdAt: new Date().toISOString(),
});

export default function AdminOurSpace() {
  const [items, setItems] = useState<OurSpaceItem[]>(() => getOurSpace());
  const [editing, setEditing] = useState<OurSpaceItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!editing) return;
    saveOurSpaceItem(editing);
    setItems(getOurSpace());
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: string) => {
    deleteOurSpaceItem(id);
    setItems(getOurSpace());
    setConfirmDelete(null);
  };

  const setField = (key: keyof OurSpaceItem, value: string) =>
    setEditing((e) => e ? { ...e, [key]: value } : e);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tighter">Our Space</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage event posters and media items</p>
        </div>
        <Button onClick={() => setEditing(emptyItem())} className="font-mono uppercase tracking-wider text-xs">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {editing && (
        <div className="mb-6 border border-primary/50 bg-card p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-mono text-sm font-bold tracking-wider uppercase">{editing.id && !items.find(i => i.id === editing.id) ? "New Item" : "Edit Item"}</h2>
            <Button variant="ghost" size="sm" onClick={() => setEditing(null)}><X className="w-4 h-4" /></Button>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Title *</label>
            <Input value={editing.title} onChange={(e) => setField("title", e.target.value)} placeholder="Launch Summit 2024" className="bg-background" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Description</label>
            <Textarea value={editing.description} onChange={(e) => setField("description", e.target.value)} placeholder="Short description of the event..." className="bg-background min-h-[80px]" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Poster / Banner Image URL</label>
            <Input value={editing.imageUrl} onChange={(e) => setField("imageUrl", e.target.value)} placeholder="https://... or /images/poster.jpg" className="bg-background" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-2">
              <Youtube className="w-4 h-4 text-red-500" />
              YouTube Video URL *
            </label>
            <Input value={editing.youtubeUrl} onChange={(e) => setField("youtubeUrl", e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="bg-background" />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} className="font-mono uppercase tracking-wider text-xs">
              <Save className="w-4 h-4 mr-2" />
              Save Item
            </Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
          {saved && <p className="text-green-400 text-xs">Saved successfully!</p>}
        </div>
      )}

      <div className="border border-border bg-card divide-y divide-border">
        {items.length === 0 && (
          <div className="p-8 text-center text-muted-foreground text-sm">No items yet. Add your first poster or event.</div>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="w-16 h-12 object-cover shrink-0 border border-border" />
            ) : (
              <div className="w-16 h-12 bg-muted shrink-0 flex items-center justify-center">
                <Youtube className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{item.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5 truncate">{item.description}</div>
              <div className="text-xs text-primary mt-1 truncate font-mono">{item.youtubeUrl}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => setEditing(item)}>Edit</Button>
              {confirmDelete === item.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-400">Delete?</span>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Yes</Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>No</Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(item.id)} className="text-muted-foreground hover:text-red-400">
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
