import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

// Pages
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Community from "@/pages/Community";
import Sponsors from "@/pages/Sponsors";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import YouTube from "@/pages/YouTube";

function VisitTracker() {
  const [location] = useLocation();
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: location, isAdmin }),
    }).catch(() => {});
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/community" component={Community} />
      <Route path="/sponsors" component={Sponsors} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route path="/youtube" component={YouTube} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-body selection:bg-primary/30 selection:text-white">
        <VisitTracker />
        <Navigation />
        <main className="flex-grow relative">
          {/* Subtle background grain or pattern could go here */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0 mix-blend-overlay"></div>
          <div className="relative z-10">
            <Router />
          </div>
        </main>
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
