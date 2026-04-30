import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  getBlogPostBySlug,
  saveBlogPost,
  type BlogPost,
} from "@/lib/storage";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const empty: BlogPost = {
  id: "",
  slug: "",
  title: "",
  category: "Insights",
  tags: [],
  content: "",
  featuredImage: "",
  metaTitle: "",
  metaDescription: "",
  status: "draft",
  createdAt: "",
  updatedAt: "",
};

export default function AdminBlogEdit() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const isNew = slug === "new";

  const [post, setPost] = useState<BlogPost>(empty);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && slug) {
      const found = getBlogPostBySlug(slug);
      if (found) {
        setPost(found);
        setTagsInput(found.tags.join(", "));
      }
    } else {
      setPost({ ...empty, id: Date.now().toString() });
      setTagsInput("");
    }
  }, [slug, isNew]);

  const update = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => {
    setPost((p) => ({ ...p, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    const finalSlug = post.slug || slugify(post.title);
    const finalPost: BlogPost = {
      ...post,
      slug: finalSlug,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      metaTitle: post.metaTitle || `${post.title} — SpudBlocks`,
      metaDescription: post.metaDescription || post.title,
    };
    saveBlogPost(finalPost);
    setSaving(false);
    navigate("/admin/blog");
  };

  return (
    <div className="p-8 max-w-4xl">
      <Link
        href="/admin/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 font-mono uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog Posts
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-mono tracking-tighter">
          {isNew ? "New Post" : "Edit Post"}
        </h1>
        <Button onClick={handleSave} disabled={saving || !post.title} className="font-mono uppercase tracking-wider text-xs">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={post.title}
            onChange={(e) => update("title", e.target.value)}
            className="bg-card mt-1.5"
            placeholder="A bold post title"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={post.slug}
              onChange={(e) => update("slug", slugify(e.target.value))}
              className="bg-card mt-1.5"
              placeholder={post.title ? slugify(post.title) : "post-slug"}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={post.category}
              onChange={(e) => update("category", e.target.value)}
              className="bg-card mt-1.5"
              placeholder="Tokenomics"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="bg-card mt-1.5"
            placeholder="tge, liquidity, launch"
          />
        </div>

        <div>
          <Label htmlFor="image">Featured Image URL</Label>
          <Input
            id="image"
            value={post.featuredImage}
            onChange={(e) => update("featuredImage", e.target.value)}
            className="bg-card mt-1.5"
            placeholder="https://..."
          />
        </div>

        <div>
          <Label htmlFor="content">Content (Markdown supported: # H1, ## H2, - bullets)</Label>
          <Textarea
            id="content"
            value={post.content}
            onChange={(e) => update("content", e.target.value)}
            className="bg-card mt-1.5 min-h-[420px] font-mono text-sm"
            placeholder="Write your post here..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
          <div>
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              value={post.metaTitle}
              onChange={(e) => update("metaTitle", e.target.value)}
              className="bg-card mt-1.5"
              placeholder="Defaults to post title"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={post.status} onValueChange={(v) => update("status", v as BlogPost["status"])}>
              <SelectTrigger className="bg-card mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="metaDesc">Meta Description</Label>
          <Textarea
            id="metaDesc"
            value={post.metaDescription}
            onChange={(e) => update("metaDescription", e.target.value)}
            className="bg-card mt-1.5"
            placeholder="One sentence summary for search engines and previews"
          />
        </div>
      </div>
    </div>
  );
}
