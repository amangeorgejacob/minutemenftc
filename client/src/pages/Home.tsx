import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Zap, Users, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* robotics competition arena */}
          <img 
            src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80"
            alt="Robotics Competition" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-6 tracking-wide uppercase">
              FTC Team #12345
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 text-foreground leading-tight">
              TOTAL <span className="tech-gradient-text">CHAOS</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              We are a passionate team of student engineers designing, building, and programming robots to compete in the FIRST Tech Challenge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all hover:scale-105">
                Meet the Team
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-foreground/5 text-foreground font-bold border border-foreground/10 hover:bg-foreground/10 transition-all backdrop-blur-sm">
                Join Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Highlights */}
      <section className="py-24 bg-secondary/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-card/50 border border-foreground/10 hover:border-primary/50 transition-colors"
            >
              <Zap className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                Pushing the boundaries of what student-built robots can achieve through custom CAD designs and advanced control algorithms.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-card/50 border border-foreground/10 hover:border-primary/50 transition-colors"
            >
              <Users className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Community</h3>
              <p className="text-muted-foreground">
                Mentoring local FLL teams and hosting workshops to spread STEM education throughout our local schools.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-card/50 border border-foreground/10 hover:border-primary/50 transition-colors"
            >
              <Trophy className="w-12 h-12 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Excellence</h3>
              <p className="text-muted-foreground">
                Regional finalists 3 years running. Recognized for engineering portfolio and control systems excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Ready to support Total Chaos?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Your support helps us buy parts, register for competitions, and travel to events. Become a part of our journey.
          </p>
          <Link href="/sponsors" className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:text-accent transition-colors">
            See our Sponsors <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
