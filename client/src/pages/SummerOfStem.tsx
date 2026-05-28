// src/pages/SummerOfStem.tsx

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Cpu, Rocket } from "lucide-react";

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
      <section className="relative container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 540, damping: 28 }}
          className="relative overflow-hidden rounded-3xl border border-white/10"
        >
          <div className="absolute inset-0">
            <img
              src={stemOne}
              alt="Summer Of STEM"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/85 to-primary/20" />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.2),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.2),transparent_45%)]" />

          <div className="relative z-10 px-8 py-20 md:px-16 md:py-28 max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-white">
              SUMMER OF <span className="text-primary">STEM</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mb-10">
              A student-led summer robotics and engineering program created by
              Liberty High School students to inspire the next generation of innovators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <a href="https://www.frc4131.org/summer">
                  Explore Summer Camps
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
              </Button>

              <Button asChild variant="outline" size="lg">
                <a href="https://liberty.isd411.org/">
                  Liberty High School
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CAMP INFO CARD */}
      <section className="container mx-auto px-4 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative grid md:grid-cols-2 gap-10 p-8 md:p-12 rounded-3xl border border-white/10 overflow-hidden"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/85 to-background/70" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.14),transparent_45%)]" />

          {/* LEFT SIDE */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
              Designed By The <span className="text-primary">Iron Patriots</span>
            </h2>

            <p className="text-muted-foreground text-lg">
              The Iron Patriots, in partnership with the Liberty HS Booster Club,
              are offering <span className="text-white font-semibold">5 STEM camps</span>{" "}
              designed and led entirely by our team.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative z-10 rounded-3xl border border-white/10 bg-background/70 backdrop-blur-xl p-8">

            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                All Camps Located At
              </p>

              <h3 className="text-3xl font-black text-white mb-3">
                Liberty High School
              </h3>

              <p className="text-muted-foreground mb-8 text-lg">
                16655 SE 136th St
                <br />
                Renton, WA 98059
              </p>

              {/* UPDATED BUTTON */}
              <a
                href="https://maps.google.com/?q=16655+SE+136th+St+Renton+WA+98059"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 rounded-xl
                  bg-sky-500 text-white font-semibold
                  shadow-lg shadow-sky-500/25
                  border border-sky-300/30
                  hover:bg-sky-400 hover:shadow-sky-400/30
                  active:scale-[0.98]
                  transition-all duration-200
                "
              >
                View Location
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* QUICK HIGHLIGHTS */}
      <section className="container mx-auto px-4 mb-28">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Bot, title: "Robotics", desc: "Robot design and teamwork." },
            { icon: Cpu, title: "Programming", desc: "Coding and problem solving." },
            { icon: Rocket, title: "Innovation", desc: "Creative engineering challenges." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-8 rounded-3xl bg-secondary/20 border border-white/5"
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 space-y-28">
        {stemSections.map((item) => (
          <div key={item.title} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 text-white">
                {item.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {item.description}
              </p>
              <p className="text-muted-foreground">
                {item.bullet}
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10">
              <img src={item.image} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-32">
        <motion.div className="text-center p-12 rounded-3xl border border-white/10 bg-background/40 backdrop-blur-xl">
          <h2 className="text-4xl font-black mb-6 text-white">
            Inspiring Future Engineers
          </h2>
          <p className="text-muted-foreground mb-8">
            A hands-on STEM experience built by students, for students.
          </p>
          <Button asChild size="lg">
            <a href="https://www.frc4131.org/summer">
              Learn More <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
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