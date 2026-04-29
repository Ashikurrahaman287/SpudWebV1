import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logoUrl from "@assets/Spud_Blocks_Only_Logo_Color_Full_1777450332585.png";

export function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? "bg-background/80 backdrop-blur-md border-border" : "bg-transparent border-transparent"}`}>
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono font-bold text-xl tracking-tighter flex items-center gap-2.5">
          <img src={logoUrl} alt="SpudBlocks" className="h-8 w-8 object-contain" />
          SPUDBLOCKS
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <div className="relative group">
            <Link href="/solutions" className="hover:text-primary transition-colors py-2 block">
              Solutions
            </Link>
            <div className="absolute top-full left-0 w-48 bg-card border border-border p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/solutions/launch-system" className="block px-3 py-2 hover:bg-muted text-sm">Launch System</Link>
              <Link href="/solutions/growth-engine" className="block px-3 py-2 hover:bg-muted text-sm">Growth Engine</Link>
              <Link href="/solutions/exchange-readiness" className="block px-3 py-2 hover:bg-muted text-sm">Exchange Readiness</Link>
            </div>
          </div>
          <Link href="/work" className="hover:text-primary transition-colors">Work</Link>
          <Link href="/who-we-serve" className="hover:text-primary transition-colors">Who We Serve</Link>
          <Link href="/method" className="hover:text-primary transition-colors">Method</Link>
          <Link href="/insights" className="hover:text-primary transition-colors">Insights</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/our-space" className="hover:text-primary transition-colors">Our Space</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="default" className="font-mono uppercase tracking-wider text-xs">
            <Link href="/apply">Apply</Link>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border p-4 flex flex-col gap-4">
          <Link href="/solutions" className="px-2 py-2 hover:bg-muted font-medium">Solutions</Link>
          <Link href="/solutions/launch-system" className="px-6 py-1 text-sm text-muted-foreground hover:text-primary">Launch System</Link>
          <Link href="/solutions/growth-engine" className="px-6 py-1 text-sm text-muted-foreground hover:text-primary">Growth Engine</Link>
          <Link href="/solutions/exchange-readiness" className="px-6 py-1 text-sm text-muted-foreground hover:text-primary">Exchange Readiness</Link>
          <Link href="/work" className="px-2 py-2 hover:bg-muted font-medium">Work</Link>
          <Link href="/who-we-serve" className="px-2 py-2 hover:bg-muted font-medium">Who We Serve</Link>
          <Link href="/method" className="px-2 py-2 hover:bg-muted font-medium">Method</Link>
          <Link href="/insights" className="px-2 py-2 hover:bg-muted font-medium">Insights</Link>
          <Link href="/about" className="px-2 py-2 hover:bg-muted font-medium">About</Link>
          <Link href="/our-space" className="px-2 py-2 hover:bg-muted font-medium">Our Space</Link>
          <Button asChild className="mt-4 w-full">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      )}
    </header>
  );
}