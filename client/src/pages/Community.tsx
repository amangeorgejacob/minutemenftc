import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowDown } from "lucide-react";

import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

import stemFairImg1 from "@assets/ImpactPics/StemFair1.png";
import stemFairImg2 from "@assets/ImpactPics/StemFair2.png";
//import sixthOneImg from "@assets/ImpactPics/sixthone.jpg";
//import sixthTwoImg from "@assets/ImpactPics/sixthtwo.jpg";
import AADImg1 from "@assets/ImpactPics/AADImg1.png";
import AADImg2 from "@assets/ImpactPics/AADImg2.png";

const outreachItems = [
  {
    title: "Science Fair Demonstrations",
    description:
      "Interactive robot demos at local elementrary school science fairs where we let students see the technology up close. These elementary schools include Maple Hills, Apollo, and Briarwood.",
    image: stemFairImg1,
    image2: stemFairImg2,
    bullet: "At the Briarwood carnival, Liberty robotics had a great time spreading STEM to local students and families! Alongside our sister FRC team 4131, the Iron Patriots, Many elementary schoolers were able to drive around our Decode FTC robot, make buttons, and learn what it means to be a part of a robotics team!",
  },
  /*{
    title: "6th Grade Mentorship",
    description:
      "Mentoring new 6th graders on how to build and program demo robots, sparking early interest.",
    image: sixthOneImg,
    image2: sixthTwoImg,
    bullet:
      "Mentoring new 6th graders how to build and program demo robots",
  },*/
  {
    title: "Regional Community Events (Alaska Aviation Day)",
    description:
      "We visit many events such as Alaska Aviation Day to reach out further and inspire more kids into STEM.",
    image: AADImg1,
    image2: AADImg2,
    bullet:
      "Alaska Aviation day was a massive success! This year the Minutemen were able to visit SeaTac to spread the joy of robotics and FIRST. Liberty robotics was able to bring both their FRC robot and FTC robot, so kids and adults alike could learn and drive the robots! The Minutemen were even able to drive the Port of Seattle’s bomb robot!",
  },
];

export default function Community() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { data: visibility } = useVisibility();
  const visible = visibility?.community ?? true;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!visible && !isAdmin) {
    return <HiddenSection label="Community Impact" />;
  }

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
            Outreach & Impact
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6">
            COMMUNITY <span className="text-accent">IMPACT</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Robotics is more than building machines, it's about building people
            and communities.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={() => scrollToSection("community-impact")}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-semibold hover:scale-105 transition"
            >
              Community Impact
              <ArrowDown
                size={18}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>

            <Link
              href="/StemKits"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-accent text-accent font-semibold hover:bg-accent/10 transition"
            >
              Minutemen Kits
              <ArrowDown
                size={18}
                className="transition-transform duration-300 group-hover:translate-y-1 -rotate-90"
              />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* CURRENT IMPACT TITLE */}
      <section
        id="community-impact"
        className="container mx-auto px-4 mb-24 scroll-mt-24"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-muted-foreground">
            Current Impact
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            Over the years, we've connected with countless students and community
            members through STEM outreach, mentorship, and hands-on robotics
            experiences. While we can't showcase everything we've accomplished,
            here's a glimpse of our impact this year.
          </p>

          <ArrowDown
            size={30}
            className="mx-auto mt-6 text-accent animate-bounce"
          />
        </div>
      </section>

      {/* OUTREACH SECTIONS */}
      <section className="container mx-auto px-4 space-y-32 mb-32">
        {outreachItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* TEXT */}
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

            {/* IMAGE */}
            <div
              className={`${
                idx % 2 === 1 ? "md:order-1" : "md:order-2"
              } rounded-2xl overflow-hidden border border-white/10 h-[400px] relative group`}
            >
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/25 transition-all duration-500 z-10 pointer-events-none" />

              {item.image2 ? (
                <div className="grid grid-cols-2 h-full">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  <img
                    src={item.image2}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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