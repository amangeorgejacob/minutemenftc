import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Heart } from "lucide-react";

const impactStats = [
  { icon: Users, value: "500+", label: "Students Mentored" },
  { icon: BookOpen, value: "50+", label: "Workshops Hosted" },
  { icon: Globe, value: "10", label: "Schools Reached" },
  { icon: Heart, value: "200h", label: "Volunteer Hours" },
];

export default function Community() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="container mx-auto px-4 text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          COMMUNITY <span className="text-accent">IMPACT</span>
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Robotics is more than just building machines—it's about building people and communities.
        </p>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-secondary/20 border border-white/5 text-center hover:bg-secondary/30 transition-colors"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2 font-display">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 space-y-24">
        {/* Outreach */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-white mb-6">STEM Outreach</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We regularly visit local elementary and middle schools to demonstrate our robots and inspire young students to pursue careers in STEM.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <span className="text-muted-foreground">Interactive robot demos at science fairs</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <span className="text-muted-foreground">Intro to coding workshops with Scratch</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <span className="text-muted-foreground">Mentoring Junior FLL teams</span>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-white/10 h-[400px] relative group">
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            {/* teaching kids robotics */}
            <img 
              src="https://pixabay.com/get/g6faa0cdb80045d25fe332cf7174dc242cc7e0208de35eb7d20be226ad1bc43ade20603ac8574c7a541b7ef5a85bebd4bca8b7a3ce9095eb50d4e4b16c302b60b_1280.jpg"
              alt="STEM Outreach" 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Summer Camps */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden border border-white/10 h-[400px] relative group">
            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            {/* summer camp robotics */}
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
              alt="Summer Camps" 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Summer Robotics Camps</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Every summer, we host a week-long robotics camp where students learn to design, build, and program their own LEGO Mindstorms robots.
            </p>
            <p className="text-muted-foreground">
              These camps fund our team's season while providing hands-on engineering experience to over 50 students each year.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
