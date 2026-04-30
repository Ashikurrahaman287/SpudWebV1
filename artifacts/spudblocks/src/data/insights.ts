export type Insight = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  author: { name: string; role: string; headshotUrl: string };
  publishedDate: string;
  readMinutes: number;
  tldr: string;
  body: { type: 'heading' | 'paragraph' | 'quote' | 'chartPlaceholder' | 'callout'; content: string }[];
};

export const insightsData: Insight[] = [
  {
    slug: "5-issues-delaying-token-launches",
    title: "The 5 Issues Delaying Token Launches Before TGE",
    subtitle: "Why 80% of pre-TGE projects miss their target launch month and how operators fix it.",
    category: "Launch Readiness",
    author: { name: "Julian Vance", role: "Lead Operator", headshotUrl: "/images/team-1.png" },
    publishedDate: "2024-03-12",
    readMinutes: 6,
    tldr: "Most TGE delays stem from operational fragmentation—specifically KYC bottlenecks, untested vesting contracts, last-minute exchange requirements, fractured narrative, and poor liquidity planning.",
    body: [
      { type: "paragraph", content: "We see the same failure modes across dozens of protocols. Founders treat TGE as a marketing event when it is primarily an operational crucible." },
      { type: "heading", content: "1. The KYC Bottleneck" },
      { type: "paragraph", content: "Failing to integrate robust KYC/AML flows early leads to massive drop-off during the actual sale window. Users won't wait 48 hours for manual verification." },
      { type: "quote", content: "Your community size means nothing if 90% of them fail compliance checks at the finish line." },
      { type: "chartPlaceholder", content: "TGE Delay Causes Breakdown" },
      { type: "heading", content: "2. Untested Vesting Logic" },
      { type: "paragraph", content: "Smart contract audits take time. Modifying vesting logic post-audit forces expensive re-audits or dangerous deployments." },
      { type: "callout", content: "Operator Rule: Freeze vesting logic 60 days pre-TGE." }
    ]
  },
  {
    slug: "score-exchange-readiness",
    title: "How to Score Exchange Readiness Before You Pitch",
    subtitle: "A quantitative framework for assessing if your token is ready for Tier 1 listing conversations.",
    category: "Exchange",
    author: { name: "Sarah Lin", role: "Market Strategy", headshotUrl: "/images/team-2.png" },
    publishedDate: "2024-02-28",
    readMinutes: 8,
    tldr: "Exchanges don't care about your roadmap; they care about volume, compliance, and technical security. Use this 5-dimension radar to score your readiness.",
    body: [
      { type: "paragraph", content: "Pitching a Tier 1 exchange too early burns the bridge. You need to approach them when you are an undeniable asset to their platform." },
      { type: "heading", content: "The Readiness Dimensions" },
      { type: "chartPlaceholder", content: "Readiness Radar" },
      { type: "paragraph", content: "We assess projects across Product, Narrative, Community, Sale Ops, and Market Entry. A score below 7/10 in any category requires remediation." },
      { type: "quote", content: "Tier 1 exchanges are seeking volume drivers, not science experiments." }
    ]
  },
  {
    slug: "community-growth-mistakes",
    title: "What Pre-TGE Founders Get Wrong About Community Growth",
    subtitle: "Stop optimizing for Discord member count. Start optimizing for qualified liquidity.",
    category: "Growth",
    author: { name: "Marcus Reed", role: "Growth Engineer", headshotUrl: "/images/team-3.png" },
    publishedDate: "2024-02-15",
    readMinutes: 5,
    tldr: "Vanity metrics kill launches. A Discord with 100k bots yields $0 in TVL. Focus on retention loops and verifiable on-chain actions.",
    body: [
      { type: "paragraph", content: "The industry standard for community growth is fundamentally broken. Airdrop farming creates temporary spikes that collapse immediately post-TGE." },
      { type: "heading", content: "The Illusion of Scale" },
      { type: "paragraph", content: "We track 'Qualified Application Funnel'—users who have passed KYC, connected a wallet with history, and engaged with the testnet." },
      { type: "callout", content: "1,000 qualified users > 100,000 idle lurkers." }
    ]
  },
  {
    slug: "tokenomics-vesting-schedules",
    title: "Designing Vesting Schedules for Long-Term Alignment",
    subtitle: "Protecting retail while incentivizing the core team.",
    category: "Tokenomics",
    author: { name: "Julian Vance", role: "Lead Operator", headshotUrl: "/images/team-1.png" },
    publishedDate: "2024-01-20",
    readMinutes: 4,
    tldr: "Standard 1-year cliffs are no longer sufficient. Explore milestone-based and dynamic vesting.",
    body: [
      { type: "paragraph", content: "Tokenomics is applied behavioral economics. Vesting should map to value creation milestones, not just time." }
    ]
  }
];
