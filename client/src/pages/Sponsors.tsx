import { useSponsors } from "@/hooks/use-team-data";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Trophy } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVisibility } from "@/hooks/use-visibility";
import { AdminVisibilityToggle } from "@/components/AdminVisibilityToggle";
import { HiddenSection } from "@/components/HiddenSection";

// Use public URLs directly with cache busting for reliability
const LOCAL_LOGOS: Record<string, string> = {
  "FIRST Washington": `/FirstWashington.png?v=${Date.now()}`,
  "Issaquah Schools Foundation": `/ISF-Logo.png?v=${Date.now()}`,
  "Maywood Middle School PTSA": `/Maywood-PTSA-Logo.png?v=${Date.now()}`,
};

const COLORS = ["#22c55e", "#84cc16", "#eab308", "#16a34a", "#ca8a04"];

export default function Sponsors() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const { data: visibility } = useVisibility();
  const visible = visibility?.sponsors ?? true;
  const { data: sponsors, isLoading } = useSponsors();

  if (!visible && !isAdmin) return <HiddenSection label="Sponsors" />;

  const fundingData = sponsors ? [
    { name: sponsors.find(s => s.name === "Boeing")?.name || "Boeing", value: 16 },
    { name: sponsors.find(s => s.name === "Microsoft")?.name || "Microsoft", value: 8 },
    { name: sponsors.find(s => s.name === "FIRST Washington")?.name || "FIRST Washington", value: 17 },
    { name: sponsors.find(s => s.name === "Issaquah Schools Foundation")?.name || "Issaquah Schools Foundation", value: 49 },
    { name: sponsors.find(s => s.name === "Maywood Middle School PTSA")?.name || "Maywood PTSA", value: 10 },
  ] : [];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    const displayName = name.length > 20 ? `${name.substring(0, 20)}...` : name;

    return (
      <text 
        x={x} 
        y={y} 
        fill="currentColor" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-[10px] md:text-xs font-medium fill-muted-foreground"
      >
        {name.includes("Issaquah") ? (
          <>
            <tspan x={x} dy="-0.5em">Issaquah Schools</tspan>
            <tspan x={x} dy="1.2em">Foundation: {value}%</tspan>
          </>
        ) : (
          `${displayName}: ${value}%`
        )}
      </text>
    );
  };

  const sortedSponsors = sponsors?.sort((a, b) => {
    const priority = ["Boeing", "Microsoft"];
    const aPriority = priority.indexOf(a.name);
    const bPriority = priority.indexOf(b.name);
    
    if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="container mx-auto px-4 text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          OUR <span className="text-primary">SPONSORS</span>
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We wouldn't be able to achieve our goals without the generous support of our partners. Thank you for fueling our innovation.
        </p>
       {/* <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-bold border border-primary/20">
          Become a Sponsor <ArrowUpRight className="w-4 h-4" />
        </Link>*/}
      </section>

      {/* Funding Chart Section */}
      <section className="container mx-auto px-4 mb-24 max-w-4xl">
        <Card className="bg-secondary/20 border-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center font-display">Funding Distribution</CardTitle>
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
                      labelLine={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1 }}
                    >
                      {fundingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--secondary))', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Sponsors Grid */}
      <div className="container mx-auto px-4 max-w-6xl">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
            {sortedSponsors?.map((sponsor) => {
              // Priority: Local explicit mapping -> Database URL
              const logoSrc = LOCAL_LOGOS[sponsor.name] || sponsor.logoUrl;
              
              return (
                <a 
                  key={sponsor.id} 
                  href={sponsor.websiteUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-10 bg-secondary/30 border border-white/5 rounded-2xl hover:border-primary/50 transition-all hover:scale-[1.02] backdrop-blur-sm overflow-hidden min-h-[300px] flex flex-col justify-center"
                >
                  <div className="flex flex-col items-center justify-center gap-10">
                    <div className="h-32 w-full flex items-center justify-center p-2">
                      {logoSrc ? (
                        <img 
                          src={logoSrc} 
                          alt={sponsor.name} 
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-all duration-500" 
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                          <Trophy className="w-12 h-12 text-primary/40" />
                        </div>
                      )}
                    </div>
                    <div className="text-center w-full">
                      <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors block leading-tight">
                        {sponsor.name}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
      <AdminVisibilityToggle sectionId="sponsors" visible={visible} label="Sponsors page" />
    </div>
  );
}
