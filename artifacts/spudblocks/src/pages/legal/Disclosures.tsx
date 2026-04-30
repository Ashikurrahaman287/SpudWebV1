export default function Disclosures() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Disclosures</h1>
        <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-12">Last Updated: January 15, 2024</div>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed">
          <h2>General Site Disclaimer</h2>
          <p>
            Information on this website is provided for informational purposes only and does not constitute legal, tax, investment, exchange-listing, or financial advice. Digital-asset projects involve significant execution, regulatory, market, and security risk. SpudBlocks does not guarantee fundraising outcomes, token performance, exchange listings, liquidity depth, or market adoption.
          </p>

          <h2>Digital-Asset Risk</h2>
          <p>
            Digital assets are highly volatile and subject to rapidly evolving regulatory environments across multiple jurisdictions. Participation in token generation events, public sales, or secondary markets carries the risk of total loss of capital. Operators and founders must ensure they retain independent legal counsel to navigate jurisdictional compliance.
          </p>

          <h2>Exchange Pathway Disclosure</h2>
          <p>
            Any reference to exchange readiness, exchange introductions, or market-entry support describes advisory and preparation services only. Final listing decisions, compliance determinations, and market-access approvals are made solely by the relevant third-party venues and counterparties. SpudBlocks acts as an operational preparation partner and cannot compel any exchange to list a digital asset.
          </p>

          <h2>Token Holdings and Mention Disclosure</h2>
          <p>
            References to projects, protocols, or digital assets on this site are illustrative unless otherwise stated. Mention of a project or token does not imply endorsement, current ownership, future ownership, or a recommendation to purchase, sell, or hold any asset. For explicit details regarding our compensation arrangements with highlighted clients, please refer to our Token Allocation policy.
          </p>
        </div>
      </div>
    </div>
  );
}
