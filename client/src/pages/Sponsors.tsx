import { motion } from "framer-motion";
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

/**
 * SPONSORS
 */
const SPONSORS = [
  { name: "AirReps", value: 3000, websiteUrl: "https://airreps.com", logo: "AirReps.png" },
  { name: "Polymaker ($1000 worth of filament)", value: 1000, websiteUrl: "https://polymaker.com", logo: "Polymaker.png" },
  { name: "Les Schwab", value: 1000, websiteUrl: "https://lesschwab.com", logo: "LesSchwab.png" },
  { name: "AFEW", value: 1000, websiteUrl: "https://afewglobal.com", logo: "AFEW.png" },
  { name: "Microsoft", value: 1200, websiteUrl: "https://microsoft.com", logo: "Microsoft.png" },
  { name: "Starbucks", value: 2000, websiteUrl: "https://starbucks.com", logo: "Starbucks.png" },
  { name: "King and Bunnys", value: 500, websiteUrl: "https://www.kingandbunnys.com", logo: "KingAndBunnys.png" },
  { name: "Farmers Insurance", value: 300, websiteUrl: "https://farmers.com", logo: "FarmersInsurance.png" },
];

/**
 * GRANTS
 */
const GRANTS = [
  { name: "BOEING", value: 1000, websiteUrl: "https://boeing.com", logo: "Boeing.png" },
  { name: "Issaquah Schools Foundation", value: 1000, websiteUrl: "https://isfdn.org", logo: "IssaquahSchoolsFoundation.png" },
];

/**
 * PEOPLE (NO IMAGE SPACE)
 */
const PEOPLE = [
  { name: "Lucas G.", value: 1500, websiteUrl: "" },
];

const COLORS = [
  "#19C200",
  "#4274B7",
  "#0d8f00",
  "#90D0DB",
  "#2d5490",
  "#2ecc71",
  "#5dade2",
  "#145a32",
  "#1f618d",
];

export default function Sponsors() {
  const isAdmin =
    typeof window !== "undefined" &&
    localStorage.getItem("isAdmin") === "true";

  const { data: visibility } = useVisibility();

  if (!visibility) return null;

  const visible = visibility.sponsors ?? true;

  if (!visible && !isAdmin) {
    return <HiddenSection label="Sponsors" />;
  }

  const fundingData = [...SPONSORS, ...GRANTS, ...PEOPLE];

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, name } = props;

    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 35;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const isRight = x > cx;

    return (
      <text
        x={x}
        y={y}
        textAnchor={isRight ? "start" : "end"}
        dominantBaseline="central"
        className="text-[9px] md:text-[11px] fill-muted-foreground font-medium"
      >
        {name}
      </text>
    );
  };

  /**
   * SPONSOR + GRANT CARD (WITH IMAGE)
   */
  const LogoCard = ({ item }: any) => {
    const content = (
      <div className="group p-6 bg-secondary/30 border border-white/5 rounded-2xl text-center hover:border-primary/40 transition-all hover:-translate-y-1">
        <div className="h-28 flex items-center justify-center mb-4">
          {item.logo ? (
            <img
              src={`/${item.logo}`}
              alt={item.name}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="text-muted-foreground text-sm">No Logo</div>
          )}
        </div>

        <div className="text-lg font-bold group-hover:text-primary transition-colors">
          {item.name}
        </div>

        <div className="text-sm text-muted-foreground">${item.value}</div>
      </div>
    );

    if (item.websiteUrl) {
      return (
        <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    return content;
  };

  /**
   * PEOPLE CARD (NO IMAGE AREA)
   */
  const PeopleCard = ({ item }: any) => {
    const content = (
      <div className="p-8 bg-secondary/20 border border-white/5 rounded-2xl text-center hover:border-primary/40 transition-all">
        <div className="text-2xl font-bold">{item.name}</div>
        <div className="text-sm text-muted-foreground mt-2">
          ${item.value}
        </div>
      </div>
    );

    if (item.websiteUrl) {
      return (
        <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 overflow-hidden">

      {/* HERO */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0 }}>
          <p className="uppercase tracking-[0.35em] text-sm text-accent mb-4">
            Partnerships & Support
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
            OUR <span className="text-primary">FUNDING</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Sponsors, grants, and individual supporters.
          </p>
        </motion.div>
      </section>

      {/* PIE CHART */}
      <section className="container mx-auto px-4 mb-24 max-w-4xl">
        <Card className="bg-secondary/20 border-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Funding Distribution
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-[550px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={true}
                    label={renderCustomizedLabel}
                  >
                    {fundingData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>

                  <Tooltip formatter={(v: number) => `$${v}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* SPONSORS */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <h2 className="text-4xl font-black text-center mb-10">Sponsors</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPONSORS.map((s) => (
            <LogoCard key={s.name} item={s} />
          ))}
        </div>
      </section>

      {/* GRANTS */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <h2 className="text-4xl font-black text-center mb-10">Grants</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GRANTS.map((g) => (
            <LogoCard key={g.name} item={g} />
          ))}
        </div>
      </section>

      {/* PEOPLE (NO IMAGE SPACE VERSION) */}
      <section className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl font-black text-center mb-10">
          Individual Donors
        </h2>

        <div className="flex justify-center">
          {PEOPLE.map((p) => (
            <PeopleCard key={p.name} item={p} />
          ))}
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