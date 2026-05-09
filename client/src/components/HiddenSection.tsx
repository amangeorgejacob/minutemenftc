import { EyeOff } from "lucide-react";

interface HiddenSectionProps {
  label: string;
}

export function HiddenSection({ label }: HiddenSectionProps) {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="p-4 bg-secondary/50 rounded-2xl inline-block">
          <EyeOff className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{label}</h2>
        <p className="text-muted-foreground">This section is currently unavailable. Check back soon!</p>
      </div>
    </div>
  );
}
