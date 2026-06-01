import { motion } from "framer-motion";
import { Users, ArrowDown } from "lucide-react";

import mentor1 from "@assets/Mentors/mentor1.png";
import mentor2 from "@assets/Mentors/mentor2.png";
import mentor3 from "@assets/Mentors/mentor3.png";

const mentors = [
  {
    name: "John Smith",
    role: "Lead Engineering Mentor",
    image: mentor1,
    description:
      "John has over 15 years of engineering experience and helps guide our robot design, manufacturing, and strategy development.",
  },
  {
    name: "Sarah Johnson",
    role: "Programming Mentor",
    image: mentor2,
    description:
      "Sarah mentors our software team in Java development, autonomous systems, and advanced FTC programming concepts.",
  },
  {
    name: "Michael Chen",
    role: "CAD & Design Mentor",
    image: mentor3,
    description:
      "Michael assists students with CAD design, prototyping, and transforming ideas into competition-ready mechanisms.",
  },
];

export default function Mentors() {
  return (
    <div className="min-h-screen pt-24 pb-20 overflow-hidden">
      {/* HERO */}
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
            Team Support
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6">
            OUR <span className="text-accent">MENTORS</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The mentors behind Team 24131 dedicate countless hours helping students
            grow as engineers, programmers, leaders, and problem-solvers. Their
            guidance makes everything we accomplish possible.
          </p>

          <div className="flex justify-center mt-8">
            <button
              onClick={() =>
                document.getElementById("mentor-grid")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-semibold hover:scale-105 transition"
            >
              Meet Our Mentors
              <ArrowDown
                size={18}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>
        </motion.div>
      </section>

      {/* MENTOR GRID */}
        <section
          id="mentor-grid"
          className="container mx-auto px-4 scroll-mt-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {mentors.map((mentor, idx) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
              className="group"
            >
              <div className="h-full rounded-3xl overflow-hidden bg-secondary/30 border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
                {/* IMAGE */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  <h2 className="text-2xl font-black text-foreground mb-2">
                    {mentor.name}
                  </h2>

                  <p className="text-primary font-semibold mb-4">
                    {mentor.role}
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    {mentor.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THANK YOU SECTION */}
      <section className="container mx-auto px-4 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/20 p-12 text-center"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Thank You Mentors
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our mentors make it possible for students to explore STEM,
            strengthen leadership skills, and tackle engineering challenges.
            Their dedication has a lasting impact on every member of Team 24131.
          </p>
        </motion.div>
      </section>
    </div>
  );
}