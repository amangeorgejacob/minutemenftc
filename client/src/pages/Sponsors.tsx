import { useSponsors } from "@/hooks/use-team-data";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

const LOCAL_LOGOS: Record<string, string> = {
  "FIRST Washington": `/FirstWashington.png?v=${Date.now()}`,
  "Issaquah Schools Foundation": `/ISF-Logo.png?v=${Date.now()}`,
  "Maywood Middle School PTSA": `/Maywood-PTSA-Logo.png?v=${Date.now()}`,
};

const COLORS = ["#19C200", "#4274B7", "#90D0DB", "#0d8f00", "#2d5490"];

export default function Sponsors() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { data: visibility } = useVisibility();
  const visible = visibility?.sponsors ?? true;
  const { data: sponsors, isLoading } = useSponsors();

  if (!visible && !isAdmin) return <HiddenSection label="Sponsors" />;

  const fundingData = sponsors
    ? [
        {
          name: sponsors.find((s) => s.name === "Boeing")?.name || "Boeing",
          value: 16,
        },
        {
          name:
            sponsors.find((s) => s.name === "Microsoft")?.name ||
            "Microsoft",
          value: 8,
        },
        {
          name:
            sponsors.find((s) => s.name === "FIRST Washington")?.name ||
            "FIRST Washington",
          value: 17,
        },
        {
          name:
            sponsors.find(
              (s) => s.name === "Issaquah Schools Foundation"
            )?.name || "Issaquah Schools Foundation",
          value: 49,
        },
        {
          name:
            sponsors.find(
              (s) => s.name === "Maywood Middle School PTSA"
            )?.name || "Maywood PTSA",
          value: 10,
        },
      ]
    : [];

  const sortedSponsors = sponsors?.sort((a, b) => {
    const priority = ["Boeing", "Microsoft"];
    const aPriority = priority.indexOf(a.name);
    const bPriority = priority.indexOf(b.name);

    if (aPriority !== -1 && bPriority !== -1)
      return aPriority - priority.indexOf(b.name);
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;
    return 0;
  });

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const displayName =
      name.length > 20 ? `${name.substring(0, 20)}...` : name;

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-[10px] md:text-xs font-medium fill-muted-foreground"
      >
        {`${displayName}: ${value}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-20 overflow-hidden">
      {/* HERO */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 540, damping: 28 }}
        >
          <p className="uppercase tracking-[0.35em] text-sm text-accent mb-4">
            Partnerships & Support
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground mb-6">
            OUR <span className="text-primary">SPONSORS</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We wouldn't be able to achieve our goals without the generous support of our partners.
          </p>
        </motion.div>
      </section>

      {/* CHART */}
      <section className="container mx-auto px-4 mb-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-secondary/20 border-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Funding Distribution
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="h-[450px] w-full">
                {!isLoading && fundingData.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fundingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={renderCustomizedLabel}
                      >
                        {fundingData.map((_, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* GRID */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedSponsors?.map((sponsor, idx) => {
            const logoSrc =
              LOCAL_LOGOS[sponsor.name] || sponsor.logoUrl;

            return (
              <motion.a
                key={sponsor.id}
                href={sponsor.websiteUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                className="group p-10 bg-secondary/30 border border-white/5 rounded-2xl backdrop-blur-sm hover:-translate-y-1 hover:border-primary/40 transition-all min-h-[300px] flex flex-col items-center justify-center"
              >
                <div className="h-32 flex items-center justify-center mb-8">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={sponsor.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <Trophy className="w-12 h-12 text-primary/40" />
                  )}
                </div>

                <span className="text-2xl font-bold text-center group-hover:text-primary transition-colors">
                  {sponsor.name}
                </span>
              </motion.a>
            );
          })}
        </div>
      </section>

      <AdminVisibilityToggle
        sectionId="sponsors"
        visible={visible}
        label="Sponsors page"
      />
    </div>
  );
}