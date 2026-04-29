import { Link } from "wouter";
import { FileText, Coins, ShieldCheck, Scale } from "lucide-react";

export default function LegalHub() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-primary font-mono text-sm uppercase mb-4 tracking-wider">Compliance</div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Disclosures, policies, and compensation transparency.</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-2xl">
          We operate in a highly regulated, complex industry. Clarity and transparency are operational requirements.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Link href="/legal/disclosures" className="border border-border bg-card p-8 group hover:border-primary/50 transition-colors">
            <Scale className="w-8 h-8 text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Disclosures</h2>
            <p className="text-muted-foreground mb-6">General site disclaimers, no-advice clauses, and exchange pathway disclosures.</p>
            <div className="text-xs font-mono text-muted-foreground uppercase">Updated Jan 2024</div>
          </Link>

          <Link href="/legal/token-allocation" className="border border-border bg-card p-8 group hover:border-primary/50 transition-colors">
            <Coins className="w-8 h-8 text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Token Allocation</h2>
            <p className="text-muted-foreground mb-6">Transparency regarding our compensation models and conflict of interest management.</p>
            <div className="text-xs font-mono text-muted-foreground uppercase">Updated Jan 2024</div>
          </Link>

          <Link href="/legal/privacy" className="border border-border bg-card p-8 group hover:border-primary/50 transition-colors">
            <ShieldCheck className="w-8 h-8 text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Privacy Policy</h2>
            <p className="text-muted-foreground mb-6">How we collect, use, and protect your operational data and communications.</p>
            <div className="text-xs font-mono text-muted-foreground uppercase">Updated Jan 2024</div>
          </Link>

          <Link href="/legal/terms" className="border border-border bg-card p-8 group hover:border-primary/50 transition-colors">
            <FileText className="w-8 h-8 text-primary mb-6" />
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Terms of Service</h2>
            <p className="text-muted-foreground mb-6">Rules governing the use of SpudBlocks marketing materials and insights.</p>
            <div className="text-xs font-mono text-muted-foreground uppercase">Updated Jan 2024</div>
          </Link>
        </div>

        <div className="p-6 border border-border bg-card">
          <h3 className="font-bold mb-2">Specific Compliance Queries</h3>
          <p className="text-sm text-muted-foreground">
            For questions regarding our legal posture, or to request documentation for vendor due diligence, please contact <a href="mailto:compliance@spudblocks.com" className="text-primary hover:underline">compliance@spudblocks.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
