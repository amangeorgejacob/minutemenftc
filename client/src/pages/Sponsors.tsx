import { useSponsors } from "@/hooks/use-team-data";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Trophy } from "lucide-react";

// Use public URLs directly with cache busting for reliability
const LOCAL_LOGOS: Record<string, string> = {
  "FIRST Washington": `/FirstWashington.png?v=${Date.now()}`,
  "Issaquah Schools Foundation": `/ISF-Logo.png?v=${Date.now()}`,
  "Maywood Middle School PTSA": `/Maywood-PTSA-Logo.png?v=${Date.now()}`,
};

export default function Sponsors() {
  const { data: sponsors, isLoading } = useSponsors();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="container mx-auto px-4 text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          OUR <span className="text-primary">SPONSORS</span>
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We wouldn't be able to achieve our goals without the generous support of our partners. Thank you for fueling our innovation.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-bold border border-primary/20">
          Become a Sponsor <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Sponsors Grid */}
      <div className="container mx-auto px-4 max-w-6xl">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
            {sponsors?.map((sponsor) => {
              // Priority: Local explicit mapping -> Database URL
              const logoSrc = LOCAL_LOGOS[sponsor.name] || sponsor.logoUrl;
              
              return (
                <a 
                  key={sponsor.id} 
                  href={sponsor.websiteUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-10 bg-secondary/30 border border-white/5 rounded-2xl hover:border-primary/50 transition-all hover:scale-[1.02] backdrop-blur-sm overflow-hidden min-h-[300px] flex flex-col justify-center"
                >
                  <div className="flex flex-col items-center justify-center gap-10">
                    <div className="h-32 w-full flex items-center justify-center p-2">
                      {logoSrc ? (
                        <img 
                          src={logoSrc} 
                          alt={sponsor.name} 
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-all duration-500" 
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                          <Trophy className="w-12 h-12 text-primary/40" />
                        </div>
                      )}
                    </div>
                    <div className="text-center w-full">
                      <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors block leading-tight">
                        {sponsor.name}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
