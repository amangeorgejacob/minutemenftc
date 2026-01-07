import { useSponsors } from "@/hooks/use-team-data";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Trophy, Award, Medal } from "lucide-react";

export default function Sponsors() {
  const { data: sponsors, isLoading } = useSponsors();

  const tiers = {
    Gold: sponsors?.filter(s => s.tier === "Gold") || [],
    Silver: sponsors?.filter(s => s.tier === "Silver") || [],
    Bronze: sponsors?.filter(s => s.tier === "Bronze") || [],
  };

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

      {/* Tiers Display */}
      <div className="container mx-auto px-4 space-y-20">
        
        {/* GOLD TIER */}
        {tiers.Gold.length > 0 && (
          <section className="relative">
            <div className="flex items-center gap-4 mb-8">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h2 className="text-3xl font-bold text-foreground">Gold Partners</h2>
              <div className="h-px bg-white/10 flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tiers.Gold.map((sponsor) => (
                <a 
                  key={sponsor.id} 
                  href={sponsor.websiteUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-12 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl hover:border-yellow-500/50 transition-all hover:scale-[1.02]"
                >
                  <div className="h-24 flex items-center justify-center">
                    {sponsor.logoUrl ? (
                      <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                    ) : (
                      <span className="text-3xl font-bold text-foreground group-hover:text-yellow-400 transition-colors">{sponsor.name}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* SILVER TIER */}
        {tiers.Silver.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-8 h-8 text-gray-300" />
              <h2 className="text-3xl font-bold text-foreground">Silver Partners</h2>
              <div className="h-px bg-white/10 flex-grow" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {tiers.Silver.map((sponsor) => (
                <a 
                  key={sponsor.id} 
                  href={sponsor.websiteUrl || "#"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-8 bg-secondary/30 border border-white/5 rounded-xl hover:border-gray-300/50 transition-all hover:-translate-y-1"
                >
                  <div className="h-16 flex items-center justify-center">
                    {sponsor.logoUrl ? (
                      <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                    ) : (
                      <span className="text-xl font-bold text-muted-foreground group-hover:text-white transition-colors">{sponsor.name}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* BRONZE TIER */}
        {tiers.Bronze.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <Medal className="w-8 h-8 text-orange-400" />
              <h2 className="text-3xl font-bold text-foreground">Bronze Partners</h2>
              <div className="h-px bg-white/10 flex-grow" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {tiers.Bronze.map((sponsor) => (
                <a 
                  key={sponsor.id} 
                  href={sponsor.websiteUrl || "#"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-6 bg-secondary/20 border border-white/5 rounded-lg hover:bg-secondary/40 transition-all"
                >
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className="font-semibold text-muted-foreground group-hover:text-orange-300 transition-colors">{sponsor.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
