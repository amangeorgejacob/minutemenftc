// src/pages/SummerOfStem.tsx

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Bot, Cpu, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

import stemOne from "@assets/ImpactPics/StemFair.jpg";
import stemTwo from "@assets/ImpactPics/sixthone.jpg";
import stemThree from "@assets/ImpactPics/GroupPicSOS.jpg";
//import stemFour from //"@assets/ImpactPics/GroupPicSOS.jpg";

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
    image: stemThree,
    bullet:
      "High school mentors helping the next generation discover STEM.",
  },
];

const camps = [
  {
    title: "LEGO Robot Mania",
    age: "Ages 8–12",
    price: "$330",
    icon: Bot,
    color: "from-emerald-400/25 to-emerald-900/35",
    desc:
      "Take your LEGO robotics skills to the next level! Students will work in teams to complete complex robot challenges using advanced software and engineering concepts. Perfect for FLL experience or future FLL students.",
  },
  {
    title: "Video Game Development With Scratch",
    age: "Ages 8–12",
    price: "$270",
    icon: Rocket,
    color: "from-sky-400/25 to-blue-900/35",
    desc:
      "Use Scratch to learn programming while building interactive games. Students will combine coding with LEGO EV3 motors and sensors. Laptops provided.",
  },
  {
    title: "LEGO Engineering Challenge",
    age: "Ages 5–8",
    price: "$240",
    icon: Cpu,
    color: "from-emerald-400/25 to-emerald-900/35",
    desc:
      "Build with endless LEGO while learning engineering fundamentals. Design cities, bridges, skyscrapers, and more in a creative environment.",
  },
  {
    title: "Intro To Engineering & 3D Printing",
    age: "Ages 10–13",
    price: "$300",
    icon: Rocket,
    color: "from-sky-400/25 to-blue-900/35",
    desc:
      "Learn CAD design, robotics mechanisms, and create your own 3D printed project to take home. Bring your own laptop if possible.",
  },
  {
    title: "Advanced Robotics Experience",
    age: "Ages 10–13",
    price: "$360",
    icon: Bot,
    color: "from-emerald-500/30 to-green-900/40",
    desc:
      "Build, wire, and program robots using REV robotics parts. Compete in an end-of-camp robotics challenge with student mentors.",
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
    <div className="min-h-screen pt-24 pb-20 overflow-hidden scroll-smooth">

      {/* HERO */}
      <section className="relative container mx-auto px-4 mb-10">
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

          <div className="relative z-10 px-8 py-20 md:px-16 md:py-28 max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              SUMMER OF <span className="text-primary">STEM</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mb-8">
              Build robots. Code games. Design real engineering projects. Led by
              high school robotics students from Liberty High School.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => {
                  document
                    .getElementById("camps")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
              >
                Explore Camps
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* URGENCY */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-background/40 backdrop-blur-xl p-10 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-3">
            July 20–24 & July 27–31
          </h2>

          <p className="text-muted-foreground text-lg">
            Sessions run 9AM–12PM and 1PM–4PM • Limited summer spots available
          </p>
        </motion.div>
      </section>

      {/* TRUST */}
      <section className="container mx-auto px-4 mb-20">
        <div className="relative grid md:grid-cols-2 gap-10 p-10 rounded-3xl border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/85 to-background/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.14),transparent_45%)]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Designed by <span className="text-primary">Students</span>
            </h2>

            <p className="text-muted-foreground text-lg">
              Created by Liberty High School robotics students in partnership with
              FRC team Iron Patriots 4131 and the Liberty HS Booster Club.
            </p>
          </div>

          <div className="relative z-10 rounded-3xl border border-white/10 bg-background/70 backdrop-blur-xl p-8">
            <h3 className="text-2xl font-black mb-2">Liberty High School</h3>
            <p className="text-muted-foreground mb-5">
              16655 SE 136th St<br />
              Renton, WA 98059
            </p>

            <a
              href="https://maps.google.com/?q=16655+SE+136th+St+Renton+WA+98059"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-400 transition"
            >
              View Location <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FULL CAMPS ONLY (FIXED) */}
      <section id="camps" className="container mx-auto px-4 mb-28">
        <h2 className="text-4xl font-black mb-8 text-center">
          Choose Your STEM Adventure
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {camps.map((camp) => {
            const Icon = camp.icon;

            return (
              <div
                key={camp.title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-background/50 p-8"
              >
                <div className={`absolute inset-0 opacity-60 bg-gradient-to-br ${camp.color}`} />

                <div className="relative z-10">
                  <div className="flex justify-between mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                    <div className="text-right">
                      <p className="text-sm text-primary font-semibold">{camp.age}</p>
                      <p className="text-xl font-black">{camp.price}</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black mb-4">{camp.title}</h3>
                  <p className="text-muted-foreground mb-6">{camp.desc}</p>

                  <Button asChild variant="outline">
                    <a href="https://libertyhighboosters.sportngin.com/register/form/273088200">
                      Reserve Spot <ArrowUpRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DETAILS */}
      <section className="container mx-auto px-4 space-y-28">
        {stemSections.map((item) => (
          <div key={item.title} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6">{item.title}</h2>
              <p className="text-muted-foreground mb-6">{item.description}</p>
              <p className="text-muted-foreground">{item.bullet}</p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10">
              <img src={item.image} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-32">
        <div className="text-center p-12 rounded-3xl border border-white/10 bg-background/40 backdrop-blur-xl">
          <h2 className="text-4xl font-black mb-6">
            Give Your Student a Summer That Builds Confidence
          </h2>

          <p className="text-muted-foreground mb-8">
            Hands-on STEM learning led by student mentors — designed to inspire future engineers.
          </p>

          <Button asChild size="lg">
            <a href="https://www.frc4131.org/summer">
              Explore Camps <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </section>

      <AdminVisibilityToggle
        sectionId="summerOfStem"
        visible={visible}
        label="Summer Of STEM page"
      />
    </div>
  );
}