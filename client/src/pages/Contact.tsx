import { useContactForm } from "@/hooks/use-team-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import type { InsertMessage } from "@shared/routes";
import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const contactPlaceholders = [
  "you@example.com",
  "@yourdiscord",
  "+1 (555) 000-0000",
];

export default function Contact() {
  const { mutate, isPending } = useContactForm();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % contactPlaceholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="container mx-auto px-4 text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          GET IN <span className="text-accent">TOUCH</span>
        </motion.h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have FTC questions, have website suggestions, or want to sponsor us?
          Please dont hesitate to send us a message!
        </p>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-8">
            <div className="p-6 bg-secondary/30 rounded-2xl border border-foreground/10">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Email Us
              </h3>
              <p className="text-muted-foreground">lhsftc24131@gmail.com</p>
            </div>

            <div className="p-6 bg-secondary/30 rounded-2xl border border-foreground/10">
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Location
              </h3>

              <p className="text-muted-foreground">
                Liberty High School
                <br />
                16655 SE 136th St
                <br />
                Renton, WA 98059
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="p-8 rounded-3xl bg-secondary/20 border border-foreground/10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Send a Message
              </h2>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Name
                    </label>

                    <input
                      {...form.register("name")}
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/10 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="Your name"
                    />

                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Email, Discord or Phone
                    </label>

                    <input
                      {...form.register("email")}
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/10 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder={contactPlaceholders[placeholderIndex]}
                    />

                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Message
                  </label>

                  <textarea
                    {...form.register("message")}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/10 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                    placeholder="How can we help you?"
                  />

                  {form.formState.errors.message && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}