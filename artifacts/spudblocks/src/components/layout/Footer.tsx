import { Link } from "wouter";
import logoUrl from "@assets/Spud_Blocks_Only_Logo_Color_Full_1777450332585.png";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="font-mono font-bold text-xl tracking-tighter flex items-center gap-2.5 mb-6">
              <img src={logoUrl} alt="SpudBlocks" className="h-8 w-8 object-contain" />
              SPUDBLOCKS
            </Link>
            <p className="text-sm text-muted-foreground mb-8">
              Token Launch, Growth, Liquidity, and Exchange Pathway Infrastructure for Web3 projects.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold tracking-wider uppercase text-foreground mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm font-bold tracking-wider uppercase text-foreground mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm font-bold tracking-wider uppercase text-foreground mb-6">Social</h4>
            <div className="flex flex-wrap gap-3">
              <SocialIcon href="https://www.facebook.com/spudblocks" label="Facebook">
                <Facebook className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com/SPUDBLOCKS_Com" label="Instagram">
                <Instagram className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/spudblocks/" label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </SocialIcon>
              <SocialIcon href="https://twitter.com/SpudBlocks" label="Twitter / X">
                <Twitter className="w-5 h-5" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-6">
          <p className="text-xs text-muted-foreground max-w-3xl leading-relaxed">
            Information on this website is provided for informational purposes only and does not constitute legal, tax, investment, exchange-listing, or financial advice. SpudBlocks does not guarantee exchange listings, token performance, liquidity outcomes, or fundraising results.
          </p>
          <p className="text-xs text-muted-foreground shrink-0 font-mono">
            &copy; {new Date().getFullYear()} SpudBlocks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
