import { useState } from "react";
import { motion } from "framer-motion";
import { getOurSpace } from "@/lib/storage";
import { Play, ExternalLink } from "lucide-react";

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

function getThumbnail(url: string): string {
  const id = getYouTubeId(url);
  if (!id) return "";
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export default function OurSpace() {
  const items = getOurSpace();
  const [hovering, setHovering] = useState<string | null>(null);

  const handleClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-16 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <span className="font-mono text-xs tracking-widest text-primary uppercase mb-4 block">Our Space</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Events & Media</h1>
          <p className="text-xl text-muted-foreground">
            Inside the SpudBlocks operator world — conferences, summits, and behind-the-scenes content.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          {items.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No events or media yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, i) => {
                const thumb = item.imageUrl || getThumbnail(item.youtubeUrl);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="group cursor-pointer border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300"
                    onMouseEnter={() => setHovering(item.id)}
                    onMouseLeave={() => setHovering(null)}
                    onClick={() => handleClick(item.youtubeUrl)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Play className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${hovering === item.id ? "opacity-100" : "opacity-0"}`}>
                        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                          <Play className="w-7 h-7 text-white fill-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      )}
                      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                        <Play className="w-3 h-3" />
                        Watch on YouTube
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
