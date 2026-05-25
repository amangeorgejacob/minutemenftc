import { useEffect } from "react";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReactNode } from "react";
import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

const faqs: { id: string; question: string; answer: ReactNode }[] = [
  {
    id: "ftc",
    question: "What is FTC?",
    answer:
      "FTC stands for FIRST Tech Challenge. It's a robotics competition for students in grades 7–12 where teams design, build, and program robots to compete in head-to-head challenges on a 12'x12' field. Each season has a unique game with new tasks like scoring objects, climbing structures, or working autonomously. Beyond engineering, FTC also emphasizes teamwork, outreach, and the FIRST values of Gracious Professionalism.",
  },
  {
    id: "ftc-vs-frc",
    question: "What's the difference between FLL, FTC, and FRC?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong className="text-foreground">
            FLL (FIRST LEGO League)
          </strong>{" "}
          — Ages 4–16 (split into Explorer and Challenge divisions). Teams use
          LEGO Mindstorms robots on a small tabletop field. Focused on
          introducing younger kids to science, technology, and problem-solving
          through a research project and a robot game.
        </p>

        <p>
          <strong className="text-foreground">
            FTC (FIRST Tech Challenge)
          </strong>{" "}
          — Grades 7–12. Smaller robots (18" cube max), smaller field
          (12'×12'), teams of 2–15 people. More affordable and accessible, with
          a bigger focus on programming and hands-on building.
        </p>

        <p>
          <strong className="text-foreground">
            FRC (FIRST Robotics Competition)
          </strong>{" "}
          — Grades 9–12. Much larger robots (up to 125 lbs), full-sized field
          (~27'×54'), teams of 25+ people. Higher budget, more resources, and a
          more intense competition experience.
        </p>

        <p>
          <strong className="text-foreground">What they all share:</strong> All
          three are run by FIRST, emphasize teamwork and Gracious
          Professionalism, and are designed as a progression — many FRC and FTC
          students started in FLL.
        </p>
      </div>
    ),
  },
  {
    id: "game",
    question: "What is the '25-'26 game?",
    answer: (
      <div className="space-y-3">
        <p>Learn more in this video:</p>

        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/LCqWA6gSCXA"
            title="FIRST Tech Challenge 2025-2026 Game"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <p className="text-sm text-muted-foreground/70">
          Video credit:{" "}
          <a
            href="https://www.youtube.com/@FIRSTTechChallenge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            FIRST YouTube
          </a>
        </p>
      </div>
    ),
  },
  {
    id: "2026-2027-game",
    question: "What is the '26-'27 FTC game?",
    answer:
      "The 2026–2027 FIRST Tech Challenge season is officially called BIOBUZZ and is part of the larger FIRST CANOPY theme. So far, FIRST has only released teaser material, but the season appears heavily focused on nature, ecosystems, biodiversity, and environmental exploration. Community speculation points toward possible terrain navigation, stacking, mapping/scanning mechanics, or ecosystem-style scoring systems. FIRST has also announced that some field elements and robot skill requirements will be revealed earlier than usual at the 2026 Championship event. The full game reveal and kickoff are scheduled for September 12, 2026.",
  },
];

export default function FAQ() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const { data: visibility } = useVisibility();

  const visible = visibility?.faq ?? true;

  const search = useSearch();

  const openId = new URLSearchParams(search).get("open");

  const defaultValue =
    openId && faqs.find((f) => f.id === openId) ? openId : undefined;

  useEffect(() => {
    if (!defaultValue || (!visible && !isAdmin)) return;

    const timer = setTimeout(() => {
      const el = document.querySelector(
        `[data-faq-id="${defaultValue}"]`
      );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [defaultValue, visible, isAdmin]);

  if (!visible && !isAdmin) {
    return <HiddenSection label="FAQ" />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="container mx-auto px-4 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="p-4 bg-primary rounded-2xl shadow-lg shadow-primary/20">
            <HelpCircle className="w-12 h-12 text-primary-foreground" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            FREQUENTLY ASKED{" "}
            <span className="text-primary">QUESTIONS</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got a question about Minutemen or FTC? You'll likely find the answer
            here.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-4 gap-2"
            data-testid="button-contact-from-faq"
          >
            <Link href="/contact">
              <MessageCircle className="w-4 h-4" />
              Didn't answer your question?
            </Link>
          </Button>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 md:p-8 rounded-2xl bg-secondary/30 border border-foreground/10 backdrop-blur-sm"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={defaultValue}
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                data-faq-id={faq.id}
                className="border-foreground/10"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/portfolio"
            className="text-base text-primary hover:underline font-medium"
            data-testid="link-portfolio-from-faq"
          >
            More questions? Visit our portfolio or dont hesitate contact us in
            the contact page!
          </Link>
        </motion.div>
      </section>

      <AdminVisibilityToggle
        sectionId="faq"
        visible={visible}
        label="FAQ page"
      />
    </div>
  );
}