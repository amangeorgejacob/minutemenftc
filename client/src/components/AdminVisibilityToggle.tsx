import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToggleVisibility, type SectionId } from "@/hooks/use-visibility";

interface AdminVisibilityToggleProps {
  sectionId: SectionId;
  visible: boolean;
  label: string;
}

export function AdminVisibilityToggle({ sectionId, visible, label }: AdminVisibilityToggleProps) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const toggle = useToggleVisibility();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => toggle.mutate({ sectionId, visible: !visible })}
        disabled={toggle.isPending}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg border transition-all duration-200 ${
          visible
            ? "bg-green-600/90 hover:bg-green-700 text-white border-green-500"
            : "bg-red-600/90 hover:bg-red-700 text-white border-red-500"
        }`}
      >
        {toggle.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : visible ? (
          <Eye className="w-4 h-4" />
        ) : (
          <EyeOff className="w-4 h-4" />
        )}
        {visible ? `Hide ${label} from visitors` : `Show ${label} to visitors`}
      </button>
    </div>
  );
}
