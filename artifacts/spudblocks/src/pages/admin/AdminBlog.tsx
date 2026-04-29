import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Plus, Edit, Trash2, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPosts, deleteBlogPost, type BlogPost } from "@/lib/storage";

export default function AdminBlog() {
  const [, navigate] = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>(() => getBlogPosts());
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = (slug: string) => {
    deleteBlogPost(slug);
    setPosts(getBlogPosts());
    setConfirmDelete(null);
  };

  const handleNew = () => {
    navigate("/admin/blog/new");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tighter">Blog Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {posts.length} total · {posts.filter((p) => p.status === "published").length} published
          </p>
        </div>
        <Button onClick={handleNew} className="font-mono uppercase tracking-wider text-xs">
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="border border-dashed border-border bg-card/40 p-12 text-center">
          <FileText className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-bold mb-1">No blog posts yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Publish your first article to populate the public blog.
          </p>
          <Button onClick={handleNew} className="font-mono uppercase tracking-wider text-xs">
            <Plus className="w-4 h-4 mr-2" /> Create First Post
          </Button>
        </div>
      ) : (
        <div className="border border-border bg-card divide-y divide-border">
          {posts.map((p) => (
            <div key={p.id} className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium truncate">{p.title}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                      p.status === "published"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  /{p.slug}
                  {p.category && <> · {p.category}</>}
                  <> · Updated {new Date(p.updatedAt).toLocaleDateString()}</>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {p.status === "published" && (
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/blog/${p.slug}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/blog/${p.slug}`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                {confirmDelete === p.slug ? (
                  <div className="flex items-center gap-1">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(p.slug)}>
                      Del
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>
                      No
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfirmDelete(p.slug)}
                    className="text-muted-foreground hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
