import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { NotificationBanner } from "@/components/NotificationBanner";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

// Pages
import Home from "@/pages/Home";
import SummerOfStem from "@/pages/SummerOfStem";
import OurMentors from "@/pages/OurMentors";
import Portfolio from "@/pages/Portfolio";
import Community from "@/pages/Community";
import Sponsors from "@/pages/Sponsors";
import Contact from "@/pages/Contact";
import SocialMedia from "@/pages/SocialMedia";
import FAQ from "@/pages/FAQ";
import StemKits from "@/pages/StemKits";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return null;
}

function VisitTracker() {
  const [location] = useLocation();
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      if (sessionStorage.getItem("adminPinged")) return;
      sessionStorage.setItem("adminPinged", "true");
    }
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: location, isAdmin }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!isAdmin && data?.messageId) {
          sessionStorage.setItem("visitorMsgId", data.messageId);
        }
      })
      .catch(() => {});
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/SummerOfStem" component={SummerOfStem} />
      <Route path="/OurMentors" component={OurMentors} />
      <Route path="/Portfolio" component={Portfolio}/>
      <Route path="/Community" component={Community}/>
      <Route path="/Sponsors" component={Sponsors} />
      <Route path="/Contact" component={Contact} />
      <Route path="/Social" component={SocialMedia} />
      <Route path="/FAQ" component={FAQ} />
      <Route path="/StemKits" component={StemKits} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-body selection:bg-primary/30 selection:text-white">
        <ScrollToTop />
        <VisitTracker />
        <NotificationBanner />
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
