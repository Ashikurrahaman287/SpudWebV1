import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  getWebsiteContent,
  saveWebsiteContent,
  type WebsiteContent,
} from "@/lib/storage";

export default function AdminWebsiteContent() {
  const [content, setContent] = useState<WebsiteContent>(() => getWebsiteContent());
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof WebsiteContent>(k: K, v: WebsiteContent[K]) => {
    setContent((c) => ({ ...c, [k]: v }));
  };

  const handleSave = () => {
    saveWebsiteContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const stepIndices = [1, 2, 3, 4, 5, 6] as const;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tighter">Website Content</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Edit homepage hero, metrics, and the 0 → Exchange System steps.
          </p>
        </div>
        <Button onClick={handleSave} className="font-mono uppercase tracking-wider text-xs">
          <Save className="w-4 h-4 mr-2" /> {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <section className="space-y-6 mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-primary">Hero</h2>
        <div>
          <Label htmlFor="hl">Headline</Label>
          <Input
            id="hl"
            value={content.heroHeadline}
            onChange={(e) => update("heroHeadline", e.target.value)}
            className="bg-card mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="sub">Subheadline</Label>
          <Textarea
            id="sub"
            value={content.heroSubheadline}
            onChange={(e) => update("heroSubheadline", e.target.value)}
            className="bg-card mt-1.5"
          />
        </div>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-sm font-mono uppercase tracking-widest text-primary">Metrics</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Projects Supported</Label>
            <Input
              value={content.metricsProjects}
              onChange={(e) => update("metricsProjects", e.target.value)}
              className="bg-card mt-1.5"
            />
          </div>
          <div>
            <Label>Community Reach</Label>
            <Input
              value={content.metricsCommunity}
              onChange={(e) => update("metricsCommunity", e.target.value)}
              className="bg-card mt-1.5"
            />
          </div>
          <div>
            <Label>Strategic Partners</Label>
            <Input
              value={content.metricsPartners}
              onChange={(e) => update("metricsPartners", e.target.value)}
              className="bg-card mt-1.5"
            />
          </div>
          <div>
            <Label>Years Experience</Label>
            <Input
              value={content.metricsExperience}
              onChange={(e) => update("metricsExperience", e.target.value)}
              className="bg-card mt-1.5"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
          0 → Exchange System Steps
        </h2>
        {stepIndices.map((i) => {
          const titleKey = `systemStep${i}Title` as const;
          const descKey = `systemStep${i}Desc` as const;
          return (
            <div key={i} className="p-5 border border-border bg-card space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Step 0{i}
              </div>
              <Input
                value={content[titleKey]}
                onChange={(e) => update(titleKey, e.target.value)}
                className="bg-background font-bold"
              />
              <Textarea
                value={content[descKey]}
                onChange={(e) => update(descKey, e.target.value)}
                className="bg-background"
                rows={2}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
}
