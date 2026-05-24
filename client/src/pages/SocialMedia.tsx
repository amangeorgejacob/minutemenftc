import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { SiInstagram, SiYoutube, SiFacebook } from "react-icons/si";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

const instagramUrl =
  "https://www.instagram.com/minutemen.24131?igsh=MW90aWxqMDdpN3k4MA%3D%3D";

const socials = [
  {
    name: "Instagram",
    icon: SiInstagram,
    href: instagramUrl,
    active: true,
    color: "#d62976",
    description:
      "Follow our team journey, competitions, outreach, and behind-the-scenes moments.",
  },
  {
    name: "YouTube",
    icon: SiYoutube,
    active: false,
    color: "#ff0000",
    description:
      "Match recaps, robot reveals, and build season videos coming soon.",
  },
  {
    name: "Facebook",
    icon: SiFacebook,
    active: false,
    color: "#1877f2",
    description:
      "Community updates and event highlights will be posted here soon.",
  },
];

export default function SocialMediaPage() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { data: visibility } = useVisibility();
  const visible = visibility?.social ?? true;

  if (!visible && !isAdmin)
    return <HiddenSection label="Social Media" />;

  return (
    <div className="min-h-screen pt-24 pb-20 overflow-hidden">
      {/* HERO */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative px-8 py-12 md:px-16 text-center"
        >
          <div className="relative z-10">
            <p className="uppercase tracking-[0.35em] text-sm text-accent mb-4">
              Stay Connected
            </p>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6">
              SOCIAL <span className="text-primary">MEDIA</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Follow our robotics journey, competitions, outreach events, and
              team updates across our platforms.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SOCIAL CARDS */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {socials.map((social, idx) => {
            const Icon = social.icon;

            return (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
              >
                <Card
                  className={`group relative h-full overflow-hidden rounded-[2rem] border transition-all duration-500 backdrop-blur-xl ${
                    social.active
                      ? "border-white/10 bg-white/[0.04] hover:border-primary/30 hover:-translate-y-2"
                      : "border-white/5 bg-white/[0.02] opacity-70"
                  }`}
                >
                  {/* Accent Glow */}
                  <div
                    className="absolute inset-0 opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{
                      background: `radial-gradient(circle at top, ${social.color}, transparent 70%)`,
                    }}
                  />

                  <CardContent className="relative z-10 flex flex-col h-full p-8">
                    {/* Top */}
                    <div className="flex items-start justify-between mb-10">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background: social.active
                            ? social.color
                            : "rgba(255,255,255,0.06)",
                        }}
                      >
                        <Icon
                          className={`w-8 h-8 ${
                            social.active
                              ? "text-white"
                              : "text-white/40"
                          }`}
                        />
                      </div>

                      {social.active && (
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>

                    {/* Title */}
                    <div className="mb-5">
                      <h2
                        className={`text-3xl font-black tracking-tight ${
                          social.active
                            ? "text-foreground"
                            : "text-foreground/50"
                        }`}
                      >
                        {social.name}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                      {social.description}
                    </p>

                    {/* Footer */}
                    {social.active ? (
                      <Button
                        asChild
                        size="lg"
                        className="w-full rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
                        style={{
                          background: social.color,
                        }}
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Follow Us
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    ) : (
                      <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-4 text-center">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">
                          Coming Soon
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <AdminVisibilityToggle
        sectionId="social"
        visible={visible}
        label="Social Media page"
      />
    </div>
  );
}