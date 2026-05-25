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

const COLORS = ["#19C200", "#4274B7", "#90D0DB", "#0d8f00", "#2d5490"];

/*
  IMAGE FILE NAMES (put these in /public)

  Aireps.png
  Polymaker.png
  LesSchwab.png
  AFEW.png
  Microsoft.png
  Starbucks.png
  KingAndBunny.png
  FarmersInsurance.png
  Boeing.png
  IssaquahSchoolsFoundation.png
*/

const TEAM_SPONSORS = [
  {
    name: "Aireps",
    websiteUrl: "https://aireps.com",
    logo: "/Aireps.png",
  },
  {
    name: "Polymaker",
    websiteUrl: "https://polymaker.com",
    logo: "/Polymaker.png",
  },
  {
    name: "Les Schwab",
    websiteUrl: "https://lesschwab.com",
    logo: "/LesSchwab.png",
  },
  {
    name: "AFEW",
    websiteUrl: "",
    logo: "/AFEW.png",
  },
  {
    name: "Microsoft",
    websiteUrl: "https://microsoft.com",
    logo: "/Microsoft.png",
  },
  {
    name: "Starbucks",
    websiteUrl: "https://starbucks.com",
    logo: "/Starbucks.png",
  },
  {
    name: "King and Bunny",
    websiteUrl: "",
    logo: "/KingAndBunny.png",
  },
  {
    name: "Farmers Insurance",
    websiteUrl: "https://farmers.com",
    logo: "/FarmersInsurance.png",
  },
];

const GRANTS = [
  {
    name: "BOEING",
    websiteUrl: "https://boeing.com",
    logo: "/Boeing.png",
  },
  {
    name: "Issaquah Schools Foundation",
    websiteUrl: "https://isfdn.org",
    logo: "/IssaquahSchoolsFoundation.png",
  },
];

const HIDDEN_SPONSORS = [
  "FIRST Washington",
  "Maywood Middle School PTSA",
];

const INDIVIDUAL_DONORS = [
  {
    name: "Lucas G.",
  },
];

export default function Sponsors() {
  const isAdmin =
    typeof window !== "undefined" &&
    localStorage.getItem("isAdmin") === "true";

  const { data: visibility } = useVisibility();
  const { data: sponsors = [], isLoading } = useSponsors();

  if (!visibility) return null;

  const visible = visibility.sponsors ?? true;

  if (!visible && !isAdmin) {
    return <HiddenSection label="Sponsors" />;
  }

  const fundingData = [
    {
      name: "BOEING",
      value: 30,
    },
    {
      name: "Microsoft",
      value: 25,
    },
    {
      name: "Issaquah Schools Foundation",
      value: 20,
    },
    {
      name: "Polymaker",
      value: 10,
    },
    {
      name: "Other",
      value: 15,
    },
  ];

  const mergedSponsors = [
    ...TEAM_SPONSORS,
    ...sponsors.filter(
      (dbSponsor) =>
        !TEAM_SPONSORS.some(
          (staticSponsor) => staticSponsor.name === dbSponsor.name
        ) &&
        !GRANTS.some(
          (grantSponsor) => grantSponsor.name === dbSponsor.name
        ) &&
        !HIDDEN_SPONSORS.includes(dbSponsor.name)
    ),
  ];

  const renderCustomizedLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    outerRadius = 0,
    name = "",
    value = 0,
  }: any) => {
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
            We wouldn't be able to achieve our goals without the generous
            support of our sponsors, grants, and donors.
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

      {/* TEAM SPONSORS */}
      <section className="container mx-auto px-4 max-w-6xl mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-4xl font-black text-center mb-12">
            Team Sponsors
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mergedSponsors.map((sponsor, idx) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.websiteUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="group p-10 bg-secondary/30 border border-white/5 rounded-2xl backdrop-blur-sm hover:-translate-y-1 hover:border-primary/40 transition-all min-h-[300px] flex flex-col items-center justify-center"
              >
                <div className="h-32 flex items-center justify-center mb-8">
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <Trophy className="w-12 h-12 text-primary/40" />
                  )}
                </div>

                <span className="text-2xl font-bold text-center group-hover:text-primary transition-colors">
                  {sponsor.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* GRANTS */}
      <section className="container mx-auto px-4 max-w-6xl mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-4xl font-black text-center mb-4">
            Grants
          </h2>

          <p className="text-center text-muted-foreground mb-12">
            Organizations providing grant funding for our team.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GRANTS.map((grant, idx) => (
              <motion.a
                key={grant.name}
                href={grant.websiteUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 bg-secondary/30 border border-white/5 rounded-2xl backdrop-blur-sm hover:-translate-y-1 hover:border-primary/40 transition-all min-h-[300px] flex flex-col items-center justify-center"
              >
                <div className="h-32 flex items-center justify-center mb-8">
                  {grant.logo ? (
                    <img
                      src={grant.logo}
                      alt={grant.name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <Trophy className="w-12 h-12 text-primary/40" />
                  )}
                </div>

                <span className="text-2xl font-bold text-center group-hover:text-primary transition-colors">
                  {grant.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* INDIVIDUAL DONORS */}
      <section className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-black text-center mb-4">
            Individual Donors
          </h2>

          <p className="text-center text-muted-foreground mb-12">
            Special thanks to the individuals supporting our team.
          </p>

          <div className="flex justify-center">
            {INDIVIDUAL_DONORS.map((donor, idx) => (
              <motion.div
                key={donor.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group px-12 py-10 bg-secondary/20 border border-white/5 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center"
              >
                <span className="text-2xl font-bold text-center">
                  {donor.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <AdminVisibilityToggle
        sectionId="sponsors"
        visible={visible}
        label="Sponsors page"
      />
    </div>
  );
}