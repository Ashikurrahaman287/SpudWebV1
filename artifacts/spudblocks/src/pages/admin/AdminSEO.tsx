import { useState } from "react";
import { getSEO, saveSEO, SEOSettings } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

const pages = [
  { key: "home", label: "Home" },
  { key: "solutions", label: "Solutions" },
  { key: "work", label: "Work / Case Studies" },
  { key: "insights", label: "Blog / Insights" },
  { key: "about", label: "About" },
  { key: "apply", label: "Apply" },
  { key: "our-space", label: "Our Space" },
  { key: "contact", label: "Contact" },
];

export default function AdminSEO() {
  const [seo, setSEO] = useState<SEOSettings>(() => getSEO());
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const handleSave = () => {
    saveSEO(seo);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const setPageField = (page: string, field: string, value: string) => {
    setSEO((s) => ({
      ...s,
      [page]: { ...(s[page] || { title: "", description: "", keywords: "" }), [field]: value },
    }));
  };

  const current = seo[activeTab] || { title: "", description: "", keywords: "" };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tighter">SEO Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage title, description, and keywords for each page</p>
        </div>
        <Button onClick={handleSave} className="font-mono uppercase tracking-wider text-xs">
          <Save className="w-4 h-4 mr-2" />
          {saved ? "Saved!" : "Save All"}
        </Button>
      </div>

      <div className="flex gap-6">
        <div className="w-48 shrink-0">
          <div className="border border-border bg-card divide-y divide-border">
            {pages.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  activeTab === key
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 border border-border bg-card p-6 space-y-5">
          <h2 className="font-mono text-sm font-bold tracking-wider uppercase border-b border-border pb-2">
            {pages.find((p) => p.key === activeTab)?.label}
          </h2>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Page Title</label>
            <Input
              value={current.title}
              onChange={(e) => setPageField(activeTab, "title", e.target.value)}
              placeholder="SpudBlocks — Web3 Launch Operator"
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground mt-1">{current.title.length}/60 chars recommended</p>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Meta Description</label>
            <Textarea
              value={current.description}
              onChange={(e) => setPageField(activeTab, "description", e.target.value)}
              placeholder="A compelling description of the page..."
              className="bg-background min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground mt-1">{current.description.length}/160 chars recommended</p>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Keywords (comma-separated)</label>
            <Input
              value={current.keywords}
              onChange={(e) => setPageField(activeTab, "keywords", e.target.value)}
              placeholder="web3, token launch, TGE, DeFi"
              className="bg-background"
            />
          </div>

          <div className="p-4 bg-muted border border-border text-xs font-mono space-y-1">
            <div className="text-blue-400 text-sm truncate">{current.title || "Page Title"}</div>
            <div className="text-green-400">https://spudblocks.com/{activeTab === "home" ? "" : activeTab}</div>
            <div className="text-muted-foreground">{current.description || "Page description will appear here..."}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
