// src/pages/SummerOfStem.tsx

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Cpu, Rocket, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

import stemOne from "@assets/ImpactPics/StemFair.jpg";
import stemTwo from "@assets/ImpactPics/sixthone.jpg";
import stemThree from "@assets/ImpactPics/sixthtwo.jpg";

const stemSections = [
  {
    title: "Hands-On Robotics",
    description:
      "Students build, test, and program robots through collaborative engineering activities inspired by real FIRST Robotics experiences.",
    image: stemOne,
    bullet:
      "Interactive engineering challenges built around creativity and teamwork.",
  },
  {
    title: "Built By Students",
    description:
      "Summer Of STEM is led by Liberty High School robotics students who mentor younger students and create an energetic environment focused on curiosity and innovation.",
    image: stemTwo,
    image2: stemThree,
    bullet:
      "High school mentors helping the next generation discover STEM.",
  },
];

export default function SummerOfStem() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const { data: visibility } = useVisibility();

  const visible = visibility?.summerOfStem ?? true;

  if (!visible && !isAdmin) {
    return <HiddenSection label="Summer Of STEM" />;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 overflow-hidden">
      {/* HERO */}
      <section className="relative container mx-auto px-4 mb-28">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 540,
            damping: 28,
          }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={stemOne}
              alt="Summer Of STEM"
              className="w-full h-full object-cover opacity-20"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/85 to-primary/20" />
          </div>

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(25,194,0,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(66,116,183,0.18),transparent_35%)]" />

          <div className="relative z-10 px-8 py-20 md:px-16 md:py-28 max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-8 uppercase tracking-wide">
              <Sparkles className="w-4 h-4" />
              Liberty High School • Renton, Washington
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-foreground mb-8">
              SUMMER OF <span className="text-primary">STEM</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
              A student-led summer robotics and engineering program created by
              Liberty High School students to inspire the next generation of
              innovators through hands-on STEM experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-bold rounded-xl">
                <a
                  href="https://www.frc4131.org/summer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Summer Camps
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
              >
                <a
                  href="https://liberty.isd411.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Liberty High School
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* QUICK HIGHLIGHTS */}
      <section className="container mx-auto px-4 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Bot,
              title: "Robotics",
              desc:
                "Students explore robot design, engineering systems, and teamwork through engaging projects.",
            },
            {
              icon: Cpu,
              title: "Programming",
              desc:
                "Hands-on coding experiences introduce students to computational thinking and problem solving.",
            },
            {
              icon: Rocket,
              title: "Innovation",
              desc:
                "Camp activities are built to encourage creativity, experimentation, and confidence in STEM.",
            },
          ].map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] bg-secondary/20 border border-white/5 hover:border-primary/40 transition-all backdrop-blur-sm"
              >
                <Icon className="w-12 h-12 text-primary mb-6" />

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="container mx-auto px-4 space-y-32">
        {stemSections.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* TEXT */}
            <div className={idx % 2 === 1 ? "md:order-2" : "md:order-1"}>
              <p className="uppercase tracking-[0.3em] text-sm text-primary mb-4">
                Summer Of STEM
              </p>

              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                {item.title}
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {item.description}
              </p>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />

                <span className="text-muted-foreground leading-relaxed">
                  {item.bullet}
                </span>
              </div>
            </div>

            {/* IMAGE */}
            <div
              className={`${
                idx % 2 === 1 ? "md:order-1" : "md:order-2"
              } relative overflow-hidden rounded-[2rem] border border-white/10 h-[420px] group`}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-cyan-300/0 group-hover:bg-cyan-300/10 transition-all duration-500 z-10 pointer-events-none" />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent z-[5]" />

              {item.image2 ? (
                <div className="grid grid-cols-2 h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  <img
                    src={item.image2}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-gradient-to-r from-secondary/40 to-background p-12"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Inspiring Future Engineers
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              Summer Of STEM combines robotics, engineering, creativity, and
              mentorship into an experience designed to inspire curiosity and
              confidence in every student who attends.
            </p>

            <Button asChild size="lg" className="rounded-xl font-bold">
              <a
                href="https://www.frc4131.org/summer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      <AdminVisibilityToggle
        sectionId="summerOfStem"
        visible={visible}
        label="Summer Of STEM page"
      />
    </div>
  );
}