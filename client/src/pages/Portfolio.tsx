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
    <div className="min-h-screen pt-24 pb-20 overflow-hidden">
      {/* HERO */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 540,
            damping: 28,
          }}
        >
          <p className="uppercase tracking-[0.35em] text-sm text-accent mb-4">
            Engineering Journey
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6">
            OUR <span className="text-primary">PORTFOLIO</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our engineering process, design decisions, and team development.
          </p>
        </motion.div>
      </section>

      {/* QR SECTION */}
      <section className="container mx-auto px-4 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-secondary/30 border border-primary/20 rounded-2xl p-10 backdrop-blur-sm hover:-translate-y-1 transition-all">
            <div className="flex flex-col items-center gap-8">
              <div className="p-6 bg-white rounded-xl">
                <QRCodeSVG value={portfolioUrl} size={192} level="H" />
              </div>

              <div className="text-center space-y-5">
                <h2 className="text-2xl font-bold">
                  Meet the team here
                </h2>

                <p className="text-muted-foreground max-w-xl mx-auto">
                  Scan the QR code or open the document to explore our engineering portfolio.
                </p>

                <Button asChild size="lg">
                  <a
                    href="/portfolio-planning.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    Check out our Engineering Portfolio
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* VALUES */}
      <section className="container mx-auto px-4 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl p-12 border border-white/10 bg-gradient-to-r from-secondary/40 to-background"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">
                Our Core Values
              </h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Gracious Professionalism",
                    desc: "We compete fiercely but treat everyone with respect and kindness.",
                  },
                  {
                    title: "Our Innovation",
                    desc: "We create creative engineering solutions instead of following the meta.",
                  },
                  {
                    title: "Inspiration First",
                    desc: "The real victory is the curiosity, confidence, and courage we build.",
                  },
                ].map((v, idx) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.12 }}
                  >
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {v.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {v.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10"
            >
              <img
                src="/picone.jpg"
                alt="Team Collaboration"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <AdminVisibilityToggle
        sectionId="portfolio"
        visible={visible}
        label="Portfolio page"
      />
    </div>
  );
}