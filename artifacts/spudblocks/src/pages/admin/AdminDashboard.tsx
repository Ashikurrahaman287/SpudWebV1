import { getCases } from "@/lib/storage";
import { getInsights } from "@/lib/storage";
import { getOurSpace } from "@/lib/storage";
import { getContacts } from "@/lib/storage";
import { BookOpen, FileText, Image, MessageSquare, AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const cases = getCases();
  const insights = getInsights();
  const ourSpace = getOurSpace();
  const contacts = getContacts();
  const newContacts = contacts.filter((c) => c.status === "new").length;

  const stats = [
    { label: "Case Studies", value: cases.length, icon: BookOpen, href: "/admin/case-studies", color: "text-blue-400" },
    { label: "Blog Posts", value: insights.length, icon: FileText, href: "/admin/insights", color: "text-green-400" },
    { label: "Our Space Items", value: ourSpace.length, icon: Image, href: "/admin/our-space", color: "text-purple-400" },
    { label: "Contact Submissions", value: contacts.length, icon: MessageSquare, href: "/admin/contacts", color: "text-amber-400" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-mono tracking-tighter">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back. Manage all SpudBlocks content from here.</p>
      </div>

      {newContacts > 0 && (
        <div className="mb-6 flex items-center gap-3 p-4 border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>You have <strong>{newContacts}</strong> new contact submission{newContacts > 1 ? "s" : ""} to review.</span>
          <Link href="/admin/contacts" className="ml-auto underline hover:no-underline">View →</Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={href} href={href} className="block border border-border bg-card p-6 hover:border-primary/50 transition-colors">
            <div className={`${color} mb-3`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold font-mono mb-1">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border bg-card p-6">
          <h2 className="font-bold font-mono text-sm tracking-wider uppercase mb-4">Recent Case Studies</h2>
          <div className="space-y-2">
            {cases.slice(0, 4).map((c) => (
              <div key={c.slug} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-medium">{c.project}</div>
                  <div className="text-xs text-muted-foreground">{c.category} · {c.stage}</div>
                </div>
                <Link href={`/admin/case-studies/${c.slug}`} className="text-xs text-primary hover:underline">Edit</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-card p-6">
          <h2 className="font-bold font-mono text-sm tracking-wider uppercase mb-4">Recent Contacts</h2>
          {contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No submissions yet.</p>
          ) : (
            <div className="space-y-2">
              {contacts.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.email}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                    c.status === "new" ? "bg-amber-500/20 text-amber-400" :
                    c.status === "contacted" ? "bg-blue-500/20 text-blue-400" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
