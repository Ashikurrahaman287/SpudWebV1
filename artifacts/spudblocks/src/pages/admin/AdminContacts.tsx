import { useState, useEffect, useCallback } from "react";
import { getContacts, updateContactStatus, deleteContact, ContactSubmission } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Trash2, Download, RefreshCw } from "lucide-react";

function statusColor(status: ContactSubmission["status"]) {
  if (status === "new") return "bg-amber-500/20 text-amber-400";
  if (status === "contacted") return "bg-blue-500/20 text-blue-400";
  return "bg-muted text-muted-foreground";
}

function exportCSV(contacts: ContactSubmission[]) {
  const headers = ["Name", "Email", "Phone", "Message", "Status", "Submitted At"];
  const rows = contacts.map((c) => [
    `"${c.name}"`, `"${c.email}"`, `"${c.phone}"`, `"${c.message.replace(/"/g, '""')}"`, c.status, c.submittedAt,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `spudblocks-contacts-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setContacts(getContacts());
  }, []);

  // Read fresh on mount and whenever the tab regains focus
  useEffect(() => {
    refresh();
    const handleFocus = () => refresh();
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) refresh();
    });
    return () => window.removeEventListener("focus", handleFocus);
  }, [refresh]);

  const filtered = contacts.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesQuery && matchesStatus;
  });

  const handleStatusChange = (id: string, status: ContactSubmission["status"]) => {
    updateContactStatus(id, status);
    setContacts(getContacts());
  };

  const handleDelete = (id: string) => {
    deleteContact(id);
    setContacts(getContacts());
    setConfirmDelete(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tighter">Contact Submissions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {contacts.length} total · {contacts.filter((c) => c.status === "new").length} new
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={refresh} className="font-mono uppercase tracking-wider text-xs">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => exportCSV(contacts)} className="font-mono uppercase tracking-wider text-xs">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9 bg-card" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border border-border bg-card divide-y divide-border">
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground text-sm">
            {contacts.length === 0 ? "No submissions yet." : "No results for the current filter."}
          </div>
        )}
        {filtered.map((c) => (
          <div key={c.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-sm">{c.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-mono ${statusColor(c.status)}`}>{c.status}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <a href={`mailto:${c.email}`} className="hover:text-primary">{c.email}</a>
                  {c.phone && <> · {c.phone}</>}
                  <> · {new Date(c.submittedAt).toLocaleDateString()}</>
                </div>
                {expanded === c.id && (
                  <p className="text-sm text-muted-foreground mt-3 p-3 bg-muted border border-border whitespace-pre-wrap">{c.message}</p>
                )}
                <button
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  className="text-xs text-primary hover:underline mt-2"
                >
                  {expanded === c.id ? "Hide message" : "View message"}
                </button>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Select value={c.status} onValueChange={(v) => handleStatusChange(c.id, v as ContactSubmission["status"])}>
                  <SelectTrigger className="w-32 h-8 text-xs bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                {confirmDelete === c.id ? (
                  <div className="flex items-center gap-1">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(c.id)}>Del</Button>
                    <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>No</Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(c.id)} className="text-muted-foreground hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
