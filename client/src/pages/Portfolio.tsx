import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

export default function Portfolio() {
  const portfolioUrl = `${window.location.origin}/portfolio-planning.pdf`;
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { data: visibility } = useVisibility();
  const visible = visibility?.portfolio ?? true;

  if (!visible && !isAdmin) return <HiddenSection label="Portfolio" />;

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          OUR <span className="text-primary">PORTFOLIO</span>
        </motion.h1>
        
        <div className="max-w-2xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary/30 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="p-6 bg-white rounded-xl shadow-lg shadow-primary/10">
                <QRCodeSVG value={portfolioUrl} size={192} level="H" />
              </div>
              
              <div className="space-y-4 w-full">
                <h2 className="text-2xl font-bold text-foreground">Meet the team here</h2>
                <p className="text-muted-foreground">
                  Scan the QR code or click the button below to check out our full Engineering Portfolio Planning Document and see our journey in detail.
                </p>
                
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href="/portfolio-planning.pdf" target="_blank" rel="noopener noreferrer" className="gap-2">
                    Check out our Engineering Portfolio
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 mt-32">
        <div className="bg-gradient-to-r from-secondary/50 to-background rounded-3xl p-12 border border-foreground/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Core Values</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Gracious Professionalism</h3>
                  <p className="text-muted-foreground">We compete fiercely but treat everyone with respect and kindness, helping other teams whenever we can.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Our Innovation</h3>
                  <p className="text-muted-foreground">We don't just follow the meta; we try to find creative solutions to complex engineering challenges.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Inspiration First</h3>
                  <p className="text-muted-foreground">In FTC, Inspiration First means the robot is only the beginning. The real victory is the curiosity, confidence, and courage we build along the way. When we inspire others to believe they can learn, create, and lead, we're building a future far greater than any trophy.</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10">
              <img 
                src="/picone.jpg"
                alt="Team Collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <AdminVisibilityToggle sectionId="portfolio" visible={visible} label="Portfolio page" />
    </div>
  );
}
