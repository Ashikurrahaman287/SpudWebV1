import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAdmin } from "@/contexts/AdminContext";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Image,
  MessageSquare,
  Search,
  LogOut,
  ChevronRight,
} from "lucide-react";
import logoUrl from "@assets/Spud_Blocks_Only_Logo_Color_Full_1777450332585.png";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/case-studies", label: "Case Studies", icon: BookOpen },
  { href: "/admin/insights", label: "Blog / Insights", icon: FileText },
  { href: "/admin/our-space", label: "Our Space", icon: Image },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/seo", label: "SEO Settings", icon: Search },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAdmin();
  const [location, navigate] = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="h-16 flex items-center gap-2.5 px-4 border-b border-border">
          <img src={logoUrl} alt="SpudBlocks" className="h-7 w-7 object-contain" />
          <span className="font-mono font-bold text-sm tracking-tighter">ADMIN</span>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = location === href || location.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View Site ↗
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-h-screen">{children}</main>
    </div>
  );
}
