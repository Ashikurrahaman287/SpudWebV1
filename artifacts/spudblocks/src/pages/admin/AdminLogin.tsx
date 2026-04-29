import { useState } from "react";
import { useLocation } from "wouter";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import logoUrl from "@assets/Spud_Blocks_Only_Logo_Color_Full_1777450332585.png";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const [, navigate] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(password);
      if (ok) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid password. Please try again.");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={logoUrl} alt="SpudBlocks" className="h-12 w-12 object-contain mb-4" />
          <h1 className="text-2xl font-bold font-mono tracking-tighter">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">SpudBlocks CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 border border-border bg-card p-6">
          <div>
            <label className="text-sm font-medium block mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="pl-9 bg-background"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
          <Button type="submit" className="w-full font-mono uppercase tracking-wider text-xs" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          <a href="/" className="hover:text-primary transition-colors">← Back to site</a>
        </p>
      </div>
    </div>
  );
}
