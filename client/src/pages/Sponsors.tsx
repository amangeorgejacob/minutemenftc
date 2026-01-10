import { useSponsors } from "@/hooks/use-team-data";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Trophy, Award, Medal } from "lucide-react";

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
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors?.map((sponsor) => (
              <a 
                key={sponsor.id} 
                href={sponsor.websiteUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-8 bg-secondary/30 border border-white/5 rounded-2xl hover:border-primary/50 transition-all hover:scale-[1.02] backdrop-blur-sm"
              >
                <div className="h-32 flex flex-col items-center justify-center gap-4">
                  {sponsor.logoUrl ? (
                    <img 
                      src={sponsor.logoUrl} 
                      alt={sponsor.name} 
                      className="max-h-24 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors text-center">
                    {sponsor.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
