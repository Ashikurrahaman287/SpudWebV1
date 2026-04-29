import { useState } from "react";
import { Plus, Trash2, Copy, Check, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getMediaLibrary,
  addMediaItem,
  deleteMediaItem,
} from "@/lib/storage";

export default function AdminMedia() {
  const [items, setItems] = useState(() => getMediaLibrary());
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const refresh = () => setItems(getMediaLibrary());

  const handleAdd = () => {
    if (!url.trim()) return;
    addMediaItem({ url: url.trim(), name: name.trim() || "Untitled" });
    setUrl("");
    setName("");
    refresh();
  };

  const handleCopy = (u: string) => {
    navigator.clipboard.writeText(u);
    setCopied(u);
    setTimeout(() => setCopied(null), 1200);
  };

  const handleDelete = (id: string) => {
    deleteMediaItem(id);
    refresh();
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-mono tracking-tighter">Media Library</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Paste hosted image URLs to keep a quick reference list. Use these URLs in
          case study, blog, or Our Space forms.
        </p>
      </div>

      <div className="border border-border bg-card p-5 mb-8">
        <div className="grid md:grid-cols-[1fr_240px_120px] gap-3 items-end">
          <div>
            <Label htmlFor="url">Image URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="bg-background mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="name">Label (optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Hero banner v2"
              className="bg-background mt-1.5"
            />
          </div>
          <Button onClick={handleAdd} disabled={!url.trim()} className="font-mono uppercase tracking-wider text-xs h-10">
            <Plus className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="border border-dashed border-border bg-card/40 p-12 text-center">
          <ImageIcon className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-bold mb-1">No media yet</h3>
          <p className="text-sm text-muted-foreground">
            Add hosted image URLs above to build a quick-access library.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((m) => (
            <div key={m.id} className="border border-border bg-card overflow-hidden group">
              <div className="aspect-video bg-muted overflow-hidden">
                <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <div className="text-sm font-medium truncate mb-2">{m.name}</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(m.url)}
                    className="flex-1 font-mono text-xs uppercase tracking-wider"
                  >
                    {copied === m.url ? (
                      <>
                        <Check className="w-3 h-3 mr-1.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1.5" /> Copy URL
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(m.id)}
                    className="text-muted-foreground hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
