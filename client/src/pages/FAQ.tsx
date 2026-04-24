import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is FTC?",
    answer:
      "FTC stands for FIRST Tech Challenge. It's a robotics competition for students in grades 7–12 where teams design, build, and program robots to compete in head-to-head challenges on a 12'x12' field. Each season has a unique game with new tasks like scoring objects, climbing structures, or working autonomously. Beyond engineering, FTC also emphasizes teamwork, outreach, and the FIRST values of Gracious Professionalism and Coopertition.",
  },
];

export default function FAQ() {
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
            FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got a question about Total Chaos or FTC? You'll likely find the answer here.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 md:p-8 rounded-2xl bg-secondary/30 border border-foreground/10 backdrop-blur-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-foreground/10">
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
      </section>
    </div>
  );
}
