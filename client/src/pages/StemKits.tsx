import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Package } from "lucide-react";
import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

/**
 * 🔧 CONTROL WHICH KITS ARE VISIBLE HERE
 * Just add/remove IDs from this array
 */
const ENABLED_KIT_IDS = [1];
// Example later: [1, 2, 3] or [1, 4, 6]

const kits = [
  {
    id: 1,
    title: "Iron Innovators – Rocket",
    description:
      "A syringe-powered rocket STEM kit that helps 1st–2nd graders explore gravity, inertia, and Newton's Third Law through hands-on experimentation.",
    team: "Iron Patriots #4131 & Minutemen #24621 (FTC)",
    category: "Physics",
    color: "from-blue-500/30 to-blue-900/50",
    circuitxLink: "https://hisarcs.github.io/CircuitX/",
    tag: "Physics · Grades 1–2",
  },
  {
    id: 2,
    title: "Gear & Crank Explorer",
    description:
      "A hands-on mechanical kit where students build gear trains, crank mechanisms, and cam systems to learn the foundational concepts behind every robot drivetrain.",
    team: "Minutemen #24621 (FTC)",
    category: "Mechanical",
    color: "from-green-500/30 to-green-900/50",
    circuitxLink: "https://hisarcs.github.io/CircuitX/",
    tag: "Mechanical · Grades 3–5",
  },
  {
    id: 3,
    title: "Line Follower Challenge",
    description:
      "Students wire up sensors and write simple block code to make a robot follow a line — the same basic skill behind FTC autonomous routines.",
    team: "Minutemen #24621 (FTC)",
    category: "Programming",
    color: "from-purple-500/30 to-purple-900/50",
    circuitxLink: "https://hisarcs.github.io/CircuitX/",
    tag: "Coding · Grades 4–6",
  },
  {
    id: 4,
    title: "Bridge Builder STEM Kit",
    description:
      "Teams use popsicle sticks and limited materials to design bridges tested for load capacity — teaching structural engineering and iterative design.",
    team: "Minutemen #24621 (FTC)",
    category: "Engineering",
    color: "from-amber-500/30 to-orange-900/50",
    circuitxLink: "https://hisarcs.github.io/CircuitX/",
    tag: "Engineering · Grades 5–8",
  },
  {
    id: 5,
    title: "Autonomous Maze Runner",
    description:
      "A beginner FTC-inspired kit where students program a minibot to navigate a maze using distance sensors and basic decision logic.",
    team: "Minutemen #24621 (FTC)",
    category: "Programming",
    color: "from-cyan-500/30 to-cyan-900/50",
    circuitxLink: "https://hisarcs.github.io/CircuitX/",
    tag: "Coding · Grades 6–8",
  },
  {
    id: 6,
    title: "Spaghetti Tower Challenge",
    description:
      "The classic marshmallow-and-spaghetti tower challenge, packaged as a guided STEM kit with scoring rubrics and reflection prompts about iterative design.",
    team: "Minutemen #24621 (FTC)",
    category: "Engineering",
    color: "from-rose-500/30 to-rose-900/50",
    circuitxLink: "https://hisarcs.github.io/CircuitX/",
    tag: "Engineering · Grades K–3",
  },
];

const categoryColors: Record<string, string> = {
  Physics: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Mechanical: "bg-green-500/20 text-green-300 border-green-500/30",
  Programming: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Engineering: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function StemKits() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { data: visibility } = useVisibility();
  const visible = visibility?.stemKits ?? true;

  const visibleKits = kits.filter((kit) =>
    ENABLED_KIT_IDS.includes(kit.id)
  );

  if (!visible && !isAdmin) return <HiddenSection label="STEM Kits" />;

  return (
    <div className="min-h-screen pt-24 pb-20 overflow-hidden">

      {/* HERO */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 540, damping: 28 }}
          className="text-center px-8 py-12 md:px-16"
        >
          <p className="uppercase tracking-[0.35em] text-sm text-accent mb-4">
            Community Education
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6">
            STEM <span className="text-primary">KITS</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Hands-on STEM kits built by the Minutemen to spark curiosity in students of all ages.
          </p>

          <a
            href="https://hisarcs.github.io/CircuitX/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition"
          >
            View Full Kit Exchange
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { value: `${visibleKits.length}`, label: "Kits Available" },
            { value: "1", label: "Subject Areas" },
            { value: "K–8", label: "Grade Range" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-secondary/20 px-4 py-6">
              <p className="text-3xl font-black text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Our Kits
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleKits.map((kit, idx) => (
              <motion.a
                key={kit.id}
                href={kit.circuitxLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-secondary/20 hover:border-primary/30 transition-all duration-500 cursor-pointer"
              >
                <div className={`relative h-48 bg-gradient-to-br ${kit.color} flex items-center justify-center`}>
                  <Package size={56} className="text-white/30" />
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[kit.category]}`}>
                      {kit.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6 gap-3">
                  <h3 className="text-lg font-black uppercase tracking-wide text-primary">
                    {kit.title}
                  </h3>

                  <p className="text-sm text-muted-foreground flex-1">
                    {kit.description}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground/60">{kit.tag}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      View
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <AdminVisibilityToggle sectionId="stemKits" visible={visible} label="STEM Kits" />
    </div>
  );
}