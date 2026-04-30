import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "@assets/Spud_Blocks_Only_Logo_Color_Full_1777450332585.png";

type NavItem = { href: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/who-we-serve", label: "Who We Serve" },
  { href: "/method", label: "Method" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="relative py-2 hover:text-primary transition-colors duration-200"
    >
      {label}
      <span
        className="absolute left-0 right-0 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-violet))] to-transparent origin-center transition-transform duration-300 ease-out"
        style={{
          transform: active ? "scaleX(1)" : "scaleX(0)",
        }}
      />
      <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-violet))] to-transparent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </Link>
  );
}

export function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location === href || location.startsWith(href + "/");
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 border-b ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-border shadow-[0_8px_30px_-12px_rgba(123,44,245,0.18)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono font-bold text-xl tracking-tighter flex items-center gap-2.5 group"
        >
          <img
            src={logoUrl}
            alt="SpudBlocks"
            className="h-8 w-8 object-contain transition-transform duration-500 group-hover:rotate-[18deg] group-hover:scale-110"
          />
          <span className="bg-gradient-to-r from-foreground via-foreground to-foreground bg-clip-text">
            SPUDBLOCKS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onFocus={() => setServicesOpen(true)}
            onBlur={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="relative py-2 hover:text-primary transition-colors duration-200 flex items-center"
            >
              Services
              <span
                className="absolute left-0 right-0 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brand-violet))] to-transparent origin-center transition-transform duration-300 ease-out"
                style={{
                  transform: isActive("/services") || isActive("/solutions")
                    ? "scaleX(1)"
                    : "scaleX(0)",
                }}
              />
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-0 w-52 bg-card/95 backdrop-blur-xl border border-border rounded-md shadow-2xl shadow-black/40 p-1 overflow-hidden"
                >
                  {[
                    { href: "/solutions/launch-system", label: "Launch System" },
                    { href: "/solutions/growth-engine", label: "Growth Engine" },
                    {
                      href: "/solutions/exchange-readiness",
                      label: "Exchange Readiness",
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm rounded hover:bg-[hsl(var(--brand-violet)/0.12)] hover:text-foreground hover:translate-x-1 transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={isActive(item.href)}
            />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            className="font-mono uppercase tracking-wider text-xs relative overflow-hidden group"
          >
            <Link href="/apply">
              <span className="relative z-10">Apply</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--brand-blue))] via-[hsl(var(--brand-violet))] to-[hsl(var(--brand-purple))] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 transition-transform active:scale-90"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden absolute top-16 left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border p-4 flex flex-col gap-3 shadow-2xl"
          >
            <Link href="/services" className="px-2 py-2 hover:bg-muted font-medium rounded">
              Services
            </Link>
            <Link href="/solutions/launch-system" className="px-6 py-1 text-sm text-muted-foreground hover:text-primary">
              Launch System
            </Link>
            <Link href="/solutions/growth-engine" className="px-6 py-1 text-sm text-muted-foreground hover:text-primary">
              Growth Engine
            </Link>
            <Link href="/solutions/exchange-readiness" className="px-6 py-1 text-sm text-muted-foreground hover:text-primary">
              Exchange Readiness
            </Link>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 py-2 hover:bg-muted font-medium rounded"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/our-space" className="px-2 py-2 hover:bg-muted font-medium rounded">
              Our Space
            </Link>
            <Button asChild className="mt-4 w-full">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
