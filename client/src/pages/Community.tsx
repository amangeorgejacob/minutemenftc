import { motion } from "framer-motion";
import { Users, Globe, Heart } from "lucide-react";

import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

import stemFairImg from "@assets/ImpactPics/StemFair.png";
import sixthOneImg from "@assets/ImpactPics/sixthone.jpg";
import sixthTwoImg from "@assets/ImpactPics/sixthtwo.jpg";
import seafairImg from "@assets/ImpactPics/Seafair.png";

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
    description:
      "Interactive robot demos at science fairs where we let students see the technology up close.",
    image: stemFairImg,
    bullet: "Interactive robot demos at science fairs",
  },
  {
    title: "6th Grade Mentorship",
    description:
      "Mentoring new 6th graders on how to build and program demo robots, sparking early interest.",
    image: sixthOneImg,
    image2: sixthTwoImg,
    bullet:
      "Mentoring new 6th graders how to build and program demo robots",
  },
  {
    title: "Regional Community Events",
    description:
      "Visiting places like Seafair in Seattle to reach out further and inspire more kids into STEM.",
    image: seafairImg,
    bullet:
      "Going to places like Seafair in Seattle to inspire kids into STEM paths",
  },
];

export default function Community() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { data: visibility } = useVisibility();
  const visible = visibility?.community ?? true;

  if (!visible && !isAdmin) {
    return <HiddenSection label="Community Impact" />;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 overflow-hidden">
      {/* HERO (matches SocialMediaPage animation style) */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 540,
            damping: 28,
          }}
          className="text-center relative px-8 py-12 md:px-16"
        >
          <p className="uppercase tracking-[0.35em] text-sm text-accent mb-4">
            Outreach & Impact
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6">
            COMMUNITY <span className="text-accent">IMPACT</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Robotics is more than building machines — it's about building people and communities.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-4 mb-24">
        <h2 className="text-2xl font-bold text-center uppercase tracking-widest opacity-50 mb-10">
          Current Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto">
          {impactStats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 text-center hover:border-primary/20 hover:-translate-y-1 transition-all"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PROJECTED STATS */}
      <section className="container mx-auto px-4 mb-24">
        <h2 className="text-2xl font-bold text-center uppercase tracking-widest opacity-50 mb-10">
          Projected Outreach
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {projectedStats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                className="p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center hover:-translate-y-1 hover:border-primary/20 transition-all"
              >
                <Icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* OUTREACH SECTIONS */}
      <section className="container mx-auto px-4 space-y-32">
        {outreachItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className={idx % 2 === 1 ? "md:order-2" : "md:order-1"}>
              <h2 className="text-3xl font-bold mb-6">{item.title}</h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <span className="text-muted-foreground">{item.bullet}</span>
              </div>
            </div>

            <div
              className={`${
                idx % 2 === 1 ? "md:order-1" : "md:order-2"
              } rounded-2xl overflow-hidden border border-white/10 h-[400px] relative`}
            >
              {item.image2 ? (
                <div className="grid grid-cols-2 h-full">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover"
                  />
                  <img
                    src={item.image2}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </motion.div>
        ))}
      </section>

      <AdminVisibilityToggle
        sectionId="community"
        visible={visible}
        label="Impact page"
      />
    </div>
  );
}