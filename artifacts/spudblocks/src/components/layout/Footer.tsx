import { Link } from "wouter";
import logoUrl from "@assets/Spud_Blocks_Only_Logo_Color_Full_1777450332585.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="font-mono font-bold text-xl tracking-tighter flex items-center gap-2.5 mb-4">
              <img src={logoUrl} alt="SpudBlocks" className="h-8 w-8 object-contain" />
              SPUDBLOCKS
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Operator-grade launch discipline. Moving pre-TGE token founders from chaos to traction and exchange readiness.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm tracking-wider uppercase text-foreground mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/solutions/launch-system" className="hover:text-primary transition-colors">Launch System</Link></li>
              <li><Link href="/solutions/growth-engine" className="hover:text-primary transition-colors">Growth Engine</Link></li>
              <li><Link href="/solutions/exchange-readiness" className="hover:text-primary transition-colors">Exchange Readiness</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm tracking-wider uppercase text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/work" className="hover:text-primary transition-colors">Work</Link></li>
              <li><Link href="/who-we-serve" className="hover:text-primary transition-colors">Who We Serve</Link></li>
              <li><Link href="/method" className="hover:text-primary transition-colors">Method</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm tracking-wider uppercase text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/legal/disclosures" className="hover:text-primary transition-colors">Disclosures</Link></li>
              <li><Link href="/legal/token-allocation" className="hover:text-primary transition-colors">Token Allocation</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-muted-foreground max-w-2xl">
            Information on this website is provided for informational purposes only and does not constitute legal, tax, investment, exchange-listing, or financial advice.
          </p>
          <p className="text-xs text-muted-foreground shrink-0 font-mono">
            &copy; {new Date().getFullYear()} SpudBlocks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}