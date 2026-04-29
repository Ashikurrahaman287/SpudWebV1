import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { AdminProvider } from "@/contexts/AdminContext";
import { useAdmin } from "@/contexts/AdminContext";
import { useEffect } from "react";
import { useLocation } from "wouter";

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

function AdminApp() {
  const { isAuthenticated } = useAdmin();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin");
  }, [isAuthenticated]);

  if (!isAuthenticated) return <AdminLogin />;

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/case-studies/new" component={AdminCaseStudyEdit} />
        <Route path="/admin/case-studies/:slug" component={AdminCaseStudyEdit} />
        <Route path="/admin/case-studies" component={AdminCaseStudies} />
        <Route path="/admin/insights/new" component={AdminInsightEdit} />
        <Route path="/admin/insights/:slug" component={AdminInsightEdit} />
        <Route path="/admin/insights" component={AdminInsights} />
        <Route path="/admin/our-space" component={AdminOurSpace} />
        <Route path="/admin/contacts" component={AdminContacts} />
        <Route path="/admin/seo" component={AdminSEO} />
        <Route>{() => { navigate("/admin/dashboard"); return null; }}</Route>
      </Switch>
    </AdminLayout>
  );
}

function PublicRouter() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/solutions" component={Solutions} />
        <Route path="/solutions/launch-system" component={LaunchSystem} />
        <Route path="/solutions/growth-engine" component={GrowthEngine} />
        <Route path="/solutions/exchange-readiness" component={ExchangeReadiness} />
        <Route path="/work" component={Work} />
        <Route path="/work/:slug" component={WorkDetail} />
        <Route path="/who-we-serve" component={WhoWeServe} />
        <Route path="/method" component={Method} />
        <Route path="/insights" component={Insights} />
        <Route path="/insights/:slug" component={InsightDetail} />
        <Route path="/about" component={About} />
        <Route path="/apply" component={Apply} />
        <Route path="/our-space" component={OurSpace} />
        <Route path="/contact" component={Contact} />
        <Route path="/legal" component={LegalHub} />
        <Route path="/legal/disclosures" component={Disclosures} />
        <Route path="/legal/token-allocation" component={TokenAllocation} />
        <Route path="/legal/privacy" component={Privacy} />
        <Route path="/legal/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/:rest*" component={AdminApp} />
      <Route component={PublicRouter} />
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
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
