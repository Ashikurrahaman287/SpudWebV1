import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { useEffect } from "react";

// Pages
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

import LegalHub from "@/pages/legal/Hub";
import Disclosures from "@/pages/legal/Disclosures";
import TokenAllocation from "@/pages/legal/TokenAllocation";
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";

const queryClient = new QueryClient();

function Router() {
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

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
