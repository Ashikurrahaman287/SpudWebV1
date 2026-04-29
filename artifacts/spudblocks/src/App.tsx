import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { AdminProvider } from "@/contexts/AdminContext";
import { useAdmin } from "@/contexts/AdminContext";
import { ContactsProvider } from "@/contexts/ContactsContext";
import { useEffect } from "react";

// Public pages
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import Solutions from "@/pages/Solutions";
import LaunchSystem from "@/pages/LaunchSystem";
import GrowthEngine from "@/pages/GrowthEngine";
import ExchangeReadiness from "@/pages/ExchangeReadiness";
import Work from "@/pages/Work";
import WorkDetail from "@/pages/WorkDetail";
import WhoWeServe from "@/pages/WhoWeServe";
import Method from "@/pages/Method";
import Insights from "@/pages/Insights";
import InsightDetail from "@/pages/InsightDetail";
import About from "@/pages/About";
import Apply from "@/pages/Apply";
import OurSpace from "@/pages/OurSpace";
import Contact from "@/pages/Contact";

import LegalHub from "@/pages/legal/Hub";
import Disclosures from "@/pages/legal/Disclosures";
import TokenAllocation from "@/pages/legal/TokenAllocation";
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";

// Admin pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminCaseStudies from "@/pages/admin/AdminCaseStudies";
import AdminCaseStudyEdit from "@/pages/admin/AdminCaseStudyEdit";
import AdminInsights from "@/pages/admin/AdminInsights";
import AdminInsightEdit from "@/pages/admin/AdminInsightEdit";
import AdminOurSpace from "@/pages/admin/AdminOurSpace";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminSEO from "@/pages/admin/AdminSEO";

const queryClient = new QueryClient();

// Wraps a component in AdminLayout + auth guard
function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) {
    return <Redirect to="/admin" />;
  }
  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* ── Admin routes (no public layout) ─────────────────── */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard">
        {() => <AdminRoute component={AdminDashboard} />}
      </Route>
      <Route path="/admin/case-studies/:slug">
        {() => <AdminRoute component={AdminCaseStudyEdit} />}
      </Route>
      <Route path="/admin/case-studies">
        {() => <AdminRoute component={AdminCaseStudies} />}
      </Route>
      <Route path="/admin/insights/:slug">
        {() => <AdminRoute component={AdminInsightEdit} />}
      </Route>
      <Route path="/admin/insights">
        {() => <AdminRoute component={AdminInsights} />}
      </Route>
      <Route path="/admin/our-space">
        {() => <AdminRoute component={AdminOurSpace} />}
      </Route>
      <Route path="/admin/contacts">
        {() => <AdminRoute component={AdminContacts} />}
      </Route>
      <Route path="/admin/seo">
        {() => <AdminRoute component={AdminSEO} />}
      </Route>

      {/* ── Public routes (with header + footer layout) ──────── */}
      <Route path="/">
        {() => <Layout><Home /></Layout>}
      </Route>
      <Route path="/solutions">
        {() => <Layout><Solutions /></Layout>}
      </Route>
      <Route path="/solutions/launch-system">
        {() => <Layout><LaunchSystem /></Layout>}
      </Route>
      <Route path="/solutions/growth-engine">
        {() => <Layout><GrowthEngine /></Layout>}
      </Route>
      <Route path="/solutions/exchange-readiness">
        {() => <Layout><ExchangeReadiness /></Layout>}
      </Route>
      <Route path="/work">
        {() => <Layout><Work /></Layout>}
      </Route>
      <Route path="/work/:slug">
        {() => <Layout><WorkDetail /></Layout>}
      </Route>
      <Route path="/who-we-serve">
        {() => <Layout><WhoWeServe /></Layout>}
      </Route>
      <Route path="/method">
        {() => <Layout><Method /></Layout>}
      </Route>
      <Route path="/insights">
        {() => <Layout><Insights /></Layout>}
      </Route>
      <Route path="/insights/:slug">
        {() => <Layout><InsightDetail /></Layout>}
      </Route>
      <Route path="/about">
        {() => <Layout><About /></Layout>}
      </Route>
      <Route path="/apply">
        {() => <Layout><Apply /></Layout>}
      </Route>
      <Route path="/our-space">
        {() => <Layout><OurSpace /></Layout>}
      </Route>
      <Route path="/contact">
        {() => <Layout><Contact /></Layout>}
      </Route>
      <Route path="/legal">
        {() => <Layout><LegalHub /></Layout>}
      </Route>
      <Route path="/legal/disclosures">
        {() => <Layout><Disclosures /></Layout>}
      </Route>
      <Route path="/legal/token-allocation">
        {() => <Layout><TokenAllocation /></Layout>}
      </Route>
      <Route path="/legal/privacy">
        {() => <Layout><Privacy /></Layout>}
      </Route>
      <Route path="/legal/terms">
        {() => <Layout><Terms /></Layout>}
      </Route>

      {/* 404 */}
      <Route>
        {() => <Layout><NotFound /></Layout>}
      </Route>
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <ContactsProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
        </ContactsProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
