export type CaseStudy = {
  slug: string;
  project: string;
  category: string;
  stage: string;
  summary: string;
  situation: string;
  scope: string;
  timelineMilestones: { phase: string; weeks: number; description: string }[];
  beforeAfter: { metric: string; before: number; after: number; unit: string }[];
  heroMetrics: { label: string; value: string; sublabel: string }[];
  quote: { text: string; author: string; role: string };
  artifacts: string[];
};

export const casesData: CaseStudy[] = [
  {
    slug: "defi-protocol-pre-tge",
    project: "Aura Finance",
    category: "DeFi Protocol",
    stage: "Pre-TGE",
    summary: "Restructured tokenomics and launch sequence for a next-gen yield aggregator, achieving $40M TVL pre-launch.",
    situation: "Fragmented community, unclear vesting schedules, and no unified dashboard for early liquidity providers.",
    scope: "Developed launch dashboard, KYC flows, and redesigned narrative.",
    timelineMilestones: [
      { phase: "Audit", weeks: 2, description: "Technical and narrative audit." },
      { phase: "Build", weeks: 4, description: "Dashboard and sale contracts." },
      { phase: "Launch", weeks: 2, description: "TGE execution and monitoring." }
    ],
    beforeAfter: [
      { metric: "Qualified Leads", before: 500, after: 12000, unit: "users" },
      { metric: "KYC Conversion", before: 12, after: 84, unit: "%" }
    ],
    heroMetrics: [
      { label: "TVL Secured", value: "$40M", sublabel: "Pre-launch commitments" },
      { label: "Community", value: "120k", sublabel: "Active members" },
      { label: "Oversubscribed", value: "3.5x", sublabel: "Public round" }
    ],
    quote: { text: "SpudBlocks turned our chaotic roadmap into a precise, executable timeline. The dashboard they built was flawless.", author: "Elena R.", role: "Founder" },
    artifacts: ["Sale Dashboard", "Vesting Contracts", "Narrative Deck"]
  },
  {
    slug: "l2-ecosystem-launch",
    project: "Nexus Network",
    category: "L2 Ecosystem",
    stage: "Mainnet Launch",
    summary: "Orchestrated the developer grants program and token distribution for a high-throughput L2.",
    situation: "Struggling to attract quality builders pre-mainnet. Poor documentation and developer onboarding UX.",
    scope: "Developer portal, grant application system, and technical narrative overhaul.",
    timelineMilestones: [
      { phase: "Strategy", weeks: 3, description: "Grant structure and developer positioning." },
      { phase: "Portal", weeks: 5, description: "Builder hub and analytics." },
      { phase: "Activation", weeks: 4, description: "Hackathon and mainnet readiness." }
    ],
    beforeAfter: [
      { metric: "Active Devs", before: 45, after: 850, unit: "builders" },
      { metric: "DApps Live", before: 2, after: 34, unit: "projects" }
    ],
    heroMetrics: [
      { label: "Grants Distributed", value: "$5M", sublabel: "Ecosystem funding" },
      { label: "TVL Bridged", value: "$120M", sublabel: "Week 1" },
      { label: "Uptime", value: "100%", sublabel: "Launch week" }
    ],
    quote: { text: "The operator approach works. They built systems that actually scaled with our ecosystem.", author: "Marcus T.", role: "Head of Ecosystem" },
    artifacts: ["Developer Portal", "Grant System", "Technical Docs"]
  },
  {
    slug: "gaming-token",
    project: "Void Walkers",
    category: "Gaming Token",
    stage: "Pre-Sale",
    summary: "Engineered the NFT pre-sale and token utility mechanics for an AAA Web3 title.",
    situation: "Hype-driven community lacking long-term retention mechanisms. Complex in-game economy.",
    scope: "NFT minting UX, staking contracts, and player retention loops.",
    timelineMilestones: [
      { phase: "Economy", weeks: 3, description: "Tokenomics modeling." },
      { phase: "Mint UX", weeks: 4, description: "High-performance minting site." },
      { phase: "Post-Mint", weeks: 2, description: "Staking activation." }
    ],
    beforeAfter: [
      { metric: "Retention", before: 15, after: 68, unit: "%" },
      { metric: "Mint Time", before: 45, after: 2, unit: "mins" }
    ],
    heroMetrics: [
      { label: "Mint Sold Out", value: "12m", sublabel: "Time to complete" },
      { label: "Staked", value: "82%", sublabel: "NFTs locked" },
      { label: "Volume", value: "$8M", sublabel: "Secondary week 1" }
    ],
    quote: { text: "Zero downtime during our highest traffic event. Operator-grade indeed.", author: "Sarah K.", role: "Game Director" },
    artifacts: ["Minting dApp", "Staking Dashboard", "Economy Paper"]
  },
  {
    slug: "rwa-infra-protocol",
    project: "YieldBase",
    category: "RWA/Infra",
    stage: "Institutional Round",
    summary: "Built the compliance-first onboarding and tranche management system for tokenized T-Bills.",
    situation: "Manual KYC/KYB processes delaying institutional capital deployment.",
    scope: "Automated KYB flows, permissioned liquidity pools, and reporting dashboards.",
    timelineMilestones: [
      { phase: "Compliance", weeks: 4, description: "KYC/KYB integration." },
      { phase: "Platform", weeks: 6, description: "Tranche management UI." },
      { phase: "Audit", weeks: 2, description: "Security review." }
    ],
    beforeAfter: [
      { metric: "Onboarding Time", before: 14, after: 1, unit: "days" },
      { metric: "AUM", before: 0, after: 150, unit: "$M" }
    ],
    heroMetrics: [
      { label: "Institutions", value: "45+", sublabel: "Onboarded" },
      { label: "AUM", value: "$150M", sublabel: "Tokenized" },
      { label: "Compliance", value: "100%", sublabel: "Automated" }
    ],
    quote: { text: "They understand the intersection of DeFi and TradFi better than anyone.", author: "David L.", role: "CEO" },
    artifacts: ["KYB Portal", "Admin Dashboard", "Compliance Docs"]
  },
  {
    slug: "depin-network",
    project: "AeroNode",
    category: "DePIN Network",
    stage: "Hardware Pre-orders",
    summary: "Launched the hardware pre-order system and token rewards calculator for a decentralized telecom network.",
    situation: "Complex hardware specs confusing buyers; unclear token reward emissions.",
    scope: "E-commerce pre-order site, interactive rewards calculator, and network explorer.",
    timelineMilestones: [
      { phase: "E-com", weeks: 3, description: "Pre-order flow." },
      { phase: "Calculator", weeks: 3, description: "Rewards modeling UI." },
      { phase: "Explorer", weeks: 4, description: "Live node map." }
    ],
    beforeAfter: [
      { metric: "Conversion", before: 2.1, after: 8.5, unit: "%" },
      { metric: "Pre-orders", before: 500, after: 15000, unit: "units" }
    ],
    heroMetrics: [
      { label: "Nodes Sold", value: "15k", sublabel: "Hardware units" },
      { label: "Revenue", value: "$6M", sublabel: "Pre-orders" },
      { label: "Coverage", value: "42", sublabel: "Countries" }
    ],
    quote: { text: "The rewards calculator alone doubled our conversion rate.", author: "Alex M.", role: "COO" },
    artifacts: ["Pre-order Store", "Rewards Calculator", "Node Explorer"]
  },
  {
    slug: "ai-x-crypto-project",
    project: "Cognitive AI",
    category: "AI x Crypto",
    stage: "Token Generation Event",
    summary: "Structured the compute-mining network launch and initial liquidity provisioning.",
    situation: "High retail interest but low understanding of the technical compute mechanism.",
    scope: "Miner dashboard, liquidity pools setup, and technical documentation.",
    timelineMilestones: [
      { phase: "Docs", weeks: 2, description: "Technical teardown." },
      { phase: "Dashboard", weeks: 4, description: "Compute tracking." },
      { phase: "Liquidity", weeks: 2, description: "Pool seeding strategy." }
    ],
    beforeAfter: [
      { metric: "Compute Providers", before: 100, after: 4500, unit: "nodes" },
      { metric: "FDV at Launch", before: 0, after: 400, unit: "$M" }
    ],
    heroMetrics: [
      { label: "Network Hashrate", value: "2.5 EH/s", sublabel: "Compute power" },
      { label: "Liquidity", value: "$25M", sublabel: "Day 1 depth" },
      { label: "Volume", value: "$150M", sublabel: "First 24h" }
    ],
    quote: { text: "Flawless execution on a highly technical, high-stakes launch.", author: "Dr. Chen", role: "Chief Scientist" },
    artifacts: ["Miner Dashboard", "Whitepaper", "Liquidity Strategy"]
  }
];
