import { casesData, type CaseStudy } from "@/data/cases";
import { insightsData, type Insight } from "@/data/insights";
export type { CaseStudy } from "@/data/cases";
export type { Insight } from "@/data/insights";

export type OurSpaceItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  youtubeUrl: string;
  createdAt: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  telegram: string;
  company: string;
  website: string;
  stage: string;
  budget: string;
  message: string;
  submittedAt: string;
  status: "new" | "contacted" | "qualified" | "closed" | "rejected";
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

export type WebsiteContent = {
  heroHeadline: string;
  heroSubheadline: string;
  metricsProjects: string;
  metricsCommunity: string;
  metricsPartners: string;
  metricsExperience: string;
  systemStep1Title: string;
  systemStep1Desc: string;
  systemStep2Title: string;
  systemStep2Desc: string;
  systemStep3Title: string;
  systemStep3Desc: string;
  systemStep4Title: string;
  systemStep4Desc: string;
  systemStep5Title: string;
  systemStep5Desc: string;
  systemStep6Title: string;
  systemStep6Desc: string;
};

export type MediaItem = {
  id: string;
  url: string;
  name: string;
  createdAt: string;
};

export type SEOSettings = {
  [page: string]: {
    title: string;
    description: string;
    keywords: string;
  };
};

const KEYS = {
  cases: "sb_cases",
  insights: "sb_insights",
  blogPosts: "sb_blog_posts",
  ourSpace: "sb_our_space",
  contacts: "sb_contacts",
  seo: "sb_seo",
  websiteContent: "sb_website_content",
  mediaLibrary: "sb_media_library",
  adminSession: "sb_admin_session",
};

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable
  }
}

// Case Studies
export function getCases(): CaseStudy[] {
  return readJSON(KEYS.cases, casesData);
}
export function saveCases(cases: CaseStudy[]): void {
  writeJSON(KEYS.cases, cases);
}
export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return getCases().find((c) => c.slug === slug);
}
export function saveCase(c: CaseStudy): void {
  const all = getCases();
  const idx = all.findIndex((x) => x.slug === c.slug);
  if (idx >= 0) all[idx] = c;
  else all.push(c);
  saveCases(all);
}
export function deleteCase(slug: string): void {
  saveCases(getCases().filter((c) => c.slug !== slug));
}

// Insights
export function getInsights(): Insight[] {
  return readJSON(KEYS.insights, insightsData);
}
export function saveInsights(insights: Insight[]): void {
  writeJSON(KEYS.insights, insights);
}
export function getInsightBySlug(slug: string): Insight | undefined {
  return getInsights().find((i) => i.slug === slug);
}
export function saveInsight(insight: Insight): void {
  const all = getInsights();
  const idx = all.findIndex((x) => x.slug === insight.slug);
  if (idx >= 0) all[idx] = insight;
  else all.push(insight);
  saveInsights(all);
}
export function deleteInsight(slug: string): void {
  saveInsights(getInsights().filter((i) => i.slug !== slug));
}

// Blog Posts
export function getBlogPosts(): BlogPost[] {
  return readJSON(KEYS.blogPosts, []);
}
export function saveBlogPosts(posts: BlogPost[]): void {
  writeJSON(KEYS.blogPosts, posts);
}
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}
export function saveBlogPost(post: BlogPost): void {
  const all = getBlogPosts();
  const idx = all.findIndex((x) => x.slug === post.slug);
  if (idx >= 0) {
    all[idx] = { ...post, updatedAt: new Date().toISOString() };
  } else {
    all.push({ ...post, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  saveBlogPosts(all);
}
export function deleteBlogPost(slug: string): void {
  saveBlogPosts(getBlogPosts().filter((p) => p.slug !== slug));
}

// Our Space
const defaultOurSpace: OurSpaceItem[] = [
  {
    id: "1",
    title: "SpudBlocks Launch Summit 2024",
    description: "Our annual gathering of pre-TGE founders and Web3 operators. Watch the highlights.",
    imageUrl: "",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: new Date().toISOString(),
  },
];
export function getOurSpace(): OurSpaceItem[] {
  return readJSON(KEYS.ourSpace, defaultOurSpace);
}
export function saveOurSpace(items: OurSpaceItem[]): void {
  writeJSON(KEYS.ourSpace, items);
}
export function saveOurSpaceItem(item: OurSpaceItem): void {
  const all = getOurSpace();
  const idx = all.findIndex((x) => x.id === item.id);
  if (idx >= 0) all[idx] = item;
  else all.push(item);
  saveOurSpace(all);
}
export function deleteOurSpaceItem(id: string): void {
  saveOurSpace(getOurSpace().filter((i) => i.id !== id));
}

// Contacts
export function getContacts(): ContactSubmission[] {
  return readJSON(KEYS.contacts, []);
}
export function addContact(sub: Omit<ContactSubmission, "id" | "submittedAt" | "status">): void {
  const all = getContacts();
  all.unshift({
    ...sub,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "new",
  });
  writeJSON(KEYS.contacts, all);
}
export function updateContactStatus(id: string, status: ContactSubmission["status"]): void {
  const all = getContacts().map((c) => (c.id === id ? { ...c, status } : c));
  writeJSON(KEYS.contacts, all);
}
export function deleteContact(id: string): void {
  writeJSON(KEYS.contacts, getContacts().filter((c) => c.id !== id));
}

// SEO
const defaultSEO: SEOSettings = {
  home: { title: "SpudBlocks — Web3 Launch Operator", description: "Operator-grade launch discipline for pre-TGE token founders.", keywords: "web3, token launch, TGE, DeFi" },
  solutions: { title: "Solutions — SpudBlocks", description: "Launch System, Growth Engine, Exchange Readiness.", keywords: "web3 solutions, token launch system" },
  work: { title: "Work — SpudBlocks", description: "Case studies from our top Web3 launches.", keywords: "web3 case studies, token launches" },
  insights: { title: "Insights — SpudBlocks", description: "Expert analysis and launch intelligence.", keywords: "web3 insights, token launch blog" },
  about: { title: "About — SpudBlocks", description: "Who we are and how we operate.", keywords: "SpudBlocks team, web3 operator" },
};
export function getSEO(): SEOSettings {
  return readJSON(KEYS.seo, defaultSEO);
}
export function saveSEO(seo: SEOSettings): void {
  writeJSON(KEYS.seo, seo);
}

// Website Content
const defaultWebsiteContent: WebsiteContent = {
  heroHeadline: "We Launch, Grow, and List Web3 Projects.",
  heroSubheadline: "SpudBlocks helps token-based projects move from idea to product, users, liquidity, and exchange readiness through one integrated launch infrastructure system.",
  metricsProjects: "100+",
  metricsCommunity: "50M+",
  metricsPartners: "25+",
  metricsExperience: "7+",
  systemStep1Title: "Discover",
  systemStep1Desc: "Analyze the project, market, token model, and launch readiness.",
  systemStep2Title: "Build",
  systemStep2Desc: "Develop websites, DApps, SaaS tools, smart contract systems, and launch assets.",
  systemStep3Title: "Launch",
  systemStep3Desc: "Structure the TGE, campaigns, community activation, and go-to-market.",
  systemStep4Title: "Grow",
  systemStep4Desc: "Drive community, KOL alignment, content, and user acquisition.",
  systemStep5Title: "Liquidity",
  systemStep5Desc: "Prepare liquidity strategy, market making coordination, and launch stability.",
  systemStep6Title: "Exchange",
  systemStep6Desc: "Guide projects toward exchange readiness and listing pathways.",
};
export function getWebsiteContent(): WebsiteContent {
  return readJSON(KEYS.websiteContent, defaultWebsiteContent);
}
export function saveWebsiteContent(content: WebsiteContent): void {
  writeJSON(KEYS.websiteContent, content);
}

// Media Library
export function getMediaLibrary(): MediaItem[] {
  return readJSON(KEYS.mediaLibrary, []);
}
export function addMediaItem(item: Omit<MediaItem, "id" | "createdAt">): void {
  const all = getMediaLibrary();
  all.unshift({
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  });
  writeJSON(KEYS.mediaLibrary, all);
}
export function deleteMediaItem(id: string): void {
  writeJSON(KEYS.mediaLibrary, getMediaLibrary().filter(m => m.id !== id));
}

// Admin session
export function getAdminSession(): boolean {
  try {
    return sessionStorage.getItem(KEYS.adminSession) === "true";
  } catch {
    return false;
  }
}
export function setAdminSession(value: boolean): void {
  try {
    if (value) sessionStorage.setItem(KEYS.adminSession, "true");
    else sessionStorage.removeItem(KEYS.adminSession);
  } catch {
    // unavailable
  }
}
