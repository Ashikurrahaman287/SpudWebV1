import { useState } from "react";
import { useContacts } from "@/contexts/ContactsContext";
import { type ContactSubmission } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Trash2, Download, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

const statusOptions: ContactSubmission["status"][] = [
  "new",
  "contacted",
  "qualified",
  "closed",
  "rejected",
];

function statusColor(status: ContactSubmission["status"]) {
  if (status === "new") return "bg-amber-500/20 text-amber-400";
  if (status === "contacted") return "bg-blue-500/20 text-blue-400";
  if (status === "qualified") return "bg-emerald-500/20 text-emerald-400";
  if (status === "rejected") return "bg-red-500/20 text-red-400";
  return "bg-muted text-muted-foreground";
}

function exportCSV(contacts: ContactSubmission[]) {
  const headers = [
    "Name",
    "Email",
    "Telegram",
    "Company",
    "Website",
    "Stage",
    "Budget",
    "Message",
    "Status",
    "Submitted At",
  ];
  const escape = (s: string) => `"${(s ?? "").replace(/"/g, '""')}"`;
  const rows = contacts.map((c) =>
    [
      escape(c.name),
      escape(c.email),
      escape(c.telegram || c.phone || ""),
      escape(c.company || ""),
      escape(c.website || ""),
      escape(c.stage || ""),
      escape(c.budget || ""),
      escape(c.message),
      c.status,
      c.submittedAt,
    ].join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `spudblocks-contacts-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminContacts() {
  const { contacts, updateContactStatus, deleteContact, refresh, loading, error } = useContacts();
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = contacts.filter((c) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.company || "").toLowerCase().includes(q);
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tighter">Contact Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {contacts.length} total · {contacts.filter((c) => c.status === "new").length} new ·{" "}
            {contacts.filter((c) => c.status === "qualified").length} qualified
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => void refresh()} disabled={loading} className="font-mono uppercase tracking-wider text-xs">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Loading..." : "Refresh"}
          </Button>
          <Button
            variant="outline"
            onClick={() => exportCSV(contacts)}
            className="font-mono uppercase tracking-wider text-xs"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-400 border border-red-500/30 bg-red-500/10 rounded px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-44 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border border-border bg-card divide-y divide-border">
        {filtered.length === 0 && (
          <div className="p-8 text-center text-muted-foreground text-sm">
            {contacts.length === 0
              ? "No submissions yet."
              : "No results for the current filter."}
          </div>
        )}
        {filtered.map((c) => {
          const isOpen = expanded === c.id;
          return (
            <div key={c.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="font-medium text-sm">{c.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${statusColor(c.status)}`}>
                      {c.status}
                    </span>
                    {c.company && (
                      <span className="text-xs text-muted-foreground">· {c.company}</span>
                    )}
                    {c.stage && (
                      <span className="text-[10px] px-2 py-0.5 border border-border text-muted-foreground font-mono uppercase">
                        {c.stage}
                      </span>
                    )}
                    {c.budget && (
                      <span className="text-[10px] px-2 py-0.5 border border-border text-muted-foreground font-mono">
                        {c.budget}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <a href={`mailto:${c.email}`} className="hover:text-primary">
                      {c.email}
                    </a>
                    {c.telegram && <> · {c.telegram}</>}
                    {c.website && (
                      <>
                        {" · "}
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          {c.website}
                        </a>
                      </>
                    )}
                    <> · {new Date(c.submittedAt).toLocaleDateString()}</>
                  </div>
                  {isOpen && (
                    <p className="text-sm text-muted-foreground mt-3 p-3 bg-muted border border-border whitespace-pre-wrap">
                      {c.message}
                    </p>
                  )}
                  <button
                    onClick={() => setExpanded(isOpen ? null : c.id)}
                    className="text-xs text-primary hover:underline mt-2 inline-flex items-center"
                  >
                    {isOpen ? (
                      <>
                        Hide message <ChevronUp className="w-3 h-3 ml-1" />
                      </>
                    ) : (
                      <>
                        View message <ChevronDown className="w-3 h-3 ml-1" />
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Select
                    value={c.status}
                    onValueChange={(v) => updateContactStatus(c.id, v as ContactSubmission["status"])}
                  >
                    <SelectTrigger className="w-32 h-8 text-xs bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {confirmDelete === c.id ? (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          deleteContact(c.id);
                          setConfirmDelete(null);
                        }}
                      >
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
                      onClick={() => setConfirmDelete(c.id)}
                      className="text-muted-foreground hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
