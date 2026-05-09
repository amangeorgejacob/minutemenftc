import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Heart } from "lucide-react";
import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";
import stemFairImg from "@assets/ImpactPics/StemFair.png";
import sixthOneImg from "@assets/ImpactPics/sixthone.jpg";
import sixthTwoImg from "@assets/ImpactPics/sixthtwo.jpg";
import seafairImg from "@assets/ImpactPics/Seafair.png";
import img1 from "@assets/stock_images/robotics_team_studen_2e3dd691.jpg";
import img2 from "@assets/stock_images/robotics_team_studen_5851dda1.jpg";
import img3 from "@assets/stock_images/robotics_team_studen_ce1e670c.jpg";

const impactStats = [
  { icon: Users, value: "~200+", label: "Students Reached" },
  { icon: Heart, value: "~50h+", label: "Volunteer Hours" },
];

const projectedStats = [
  { icon: Globe, value: "1", label: "Projected Outreach Areas" },
  { icon: Users, value: "25+", label: "Possible Students Reached" },
  { icon: Heart, value: "~10", label: "Additional Volunteer Hours" },
];

const outreachItems = [
  {
    title: "Science Fair Demonstrations",
    description: "Interactive robot demos at science fairs where we let students see the technology up close.",
    image: stemFairImg,
    bullet: "Interactive robot demos at science fairs"
  },
  {
    title: "6th Grade Mentorship",
    description: "Mentoring new 6th graders on how to build and program demo robots, sparking early interest.",
    image: sixthOneImg,
    image2: sixthTwoImg,
    bullet: "Mentoring new 6th graders how to build and program demo robots"
  },
  {
    title: "Regional Community Events",
    description: "Visiting places like Seafair in Seattle to reach out further and inspire more kids into STEM.",
    image: seafairImg,
    bullet: "Going to places like Seafair in Seattle to reach out further to inspire kids into taking STEM paths"
  }
];

export default function Community() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { data: visibility } = useVisibility();
  const visible = visibility?.community ?? true;

  if (!visible && !isAdmin) return <HiddenSection label="Community Impact" />;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="container mx-auto px-4 text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          COMMUNITY <span className="text-accent">IMPACT</span>
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Robotics is more than just building machines - it's about building people and communities.
        </p>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 mb-24">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center uppercase tracking-widest opacity-50">Current Impact</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {impactStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-secondary/20 border border-white/5 text-center hover:bg-secondary/30 transition-colors min-w-[200px] flex-1 md:flex-none"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2 font-display">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projected Outreach */}
      <section className="container mx-auto px-4 mb-24">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center uppercase tracking-widest opacity-50">Projected Outreach</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {projectedStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center hover:bg-primary/10 transition-colors min-w-[200px] flex-1 md:flex-none"
            >
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-foreground mb-2 font-display">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 space-y-32">
        {outreachItems.map((item, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
            <div className={index % 2 === 1 ? "md:order-2" : "md:order-1"}>
              <h2 className="text-3xl font-bold text-foreground mb-6">{item.title}</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {item.description}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <span className="text-muted-foreground">{item.bullet}</span>
                </li>
              </ul>
            </div>
            <div className={`${index % 2 === 1 ? "md:order-1" : "md:order-2"} rounded-2xl overflow-hidden border border-white/10 h-[400px] relative group shadow-2xl`}>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              {item.image ? (
                item.image2 ? (
                  <div className="grid grid-cols-2 h-full w-full">
                    <img 
                      src={item.image}
                      alt={`${item.title} 1`} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <img 
                      src={item.image2}
                      alt={`${item.title} 2`} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                ) : (
                  <img 
                    src={item.image}
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                  <span className="text-muted-foreground font-medium uppercase tracking-widest">No picture found</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
      <AdminVisibilityToggle sectionId="community" visible={visible} label="Impact page" />
    </div>
  );
}
