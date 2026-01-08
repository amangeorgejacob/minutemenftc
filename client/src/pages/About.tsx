import { useMembers } from "@/hooks/use-team-data";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, Linkedin } from "lucide-react";

export default function About() {
  const { data: members, isLoading } = useMembers();

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          MEET THE <span className="text-primary">CHAOS</span>
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We are a diverse group of students united by a passion for robotics, engineering, and problem solving.
        </p>
      </section>

      {/* Team Grid */}
      <section className="container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-secondary/20 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members?.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/50 transition-all duration-300"
              >
                <div className="aspect-square relative">
                  {member.imageUrl ? (
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <span className="text-4xl font-bold text-white/20">{member.name[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider mb-1 backdrop-blur-sm border border-primary/20">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                    {member.bio}
                  </p>
                  
                  <div className="flex gap-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="p-1.5 rounded-full bg-white/10 hover:bg-primary hover:text-white text-white transition-colors">
                      <Github className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-full bg-white/10 hover:bg-[#0077b5] hover:text-white text-white transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
                  <p className="text-muted-foreground">In FTC, Inspiration First means the robot is only the beginning. The real victory is the curiosity, confidence, and courage we build along the way. When we inspire others to believe they can learn, create, and lead, we’re building a future far greater than any trophy.</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10">
              {/* students working on robot */}
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
                alt="Team Collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
