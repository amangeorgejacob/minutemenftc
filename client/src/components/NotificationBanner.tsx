import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

// ─── ICONS ────────────────────────────────────────────────────────────────────
// Change "Megaphone" to any icon from https://lucide.dev/icons/
// e.g. Bell, AlertTriangle, Info, Star, Zap, Flame, etc.
import { Megaphone, Pencil, Check, Eye, EyeOff } from "lucide-react";
// ──────────────────────────────────────────────────────────────────────────────

type NotificationData = { message: string; active: boolean };

export function NotificationBanner() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data } = useQuery<NotificationData>({
    queryKey: ["/api/notification"],
  });

  const mutation = useMutation({
    mutationFn: (update: Partial<NotificationData>) =>
      fetch("/api/notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      }).then((r) => r.json()),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["/api/notification"] }),
  });

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [editing]);

  if (!data) return null;

  const { message, active } = data;

  if (!isAdmin && !active) return null;

  function startEdit() {
    setDraft(message);
    setEditing(true);
  }

  function saveEdit() {
    if (draft.trim()) mutation.mutate({ message: draft.trim() });
    setEditing(false);
  }

  function toggleActive() {
    mutation.mutate({ active: !active });
  }

  return (
    <div
      // ─── STICKY: keeps the banner on screen as you scroll ─────────────────
      // Remove "sticky top-0 z-50" to make it static (scrolls away)
      className={`sticky top-0 z-50 w-full px-4 py-3 flex items-center gap-3 text-sm font-medium border-b transition-colors duration-300 ${
        active
          // ─── ACTIVE COLOR ────────────────────────────────────────────────
          // Replace these three classes to change the banner color when visible:
          //   bg-destructive           → red (current)
          //   bg-yellow-500            → yellow
          //   bg-primary               → green (site primary)
          //   bg-foreground            → dark blue (site blue)
          //   bg-[#your-hex]           → any custom hex color
          // text-destructive-foreground → white text (change to text-black etc.)
          // border-destructive          → matching border color
          ? "bg-destructive text-destructive-foreground border-destructive"
          // ─── INACTIVE COLOR (admin only, shown as faded) ─────────────────
          : "bg-muted border-border text-muted-foreground opacity-60"
      }`}
    >
      {/* ─── LEFT ICON ────────────────────────────────────────────────────────
          Change <Megaphone> to any other imported icon (see top of file).
          Change "size={15}" to make it bigger/smaller.
          Change "opacity-90" to "text-yellow-300" etc. for a specific color. */}
      <Megaphone size={15} className="shrink-0 opacity-90" />

      <div className="flex-1 min-w-0">
        {editing ? (
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                saveEdit();
              }
              if (e.key === "Escape") setEditing(false);
            }}
            rows={1}
            className="w-full bg-transparent border-b border-white/50 outline-none resize-none text-sm leading-snug"
          />
        ) : (
          <span className={active ? "" : "line-through"}>
            {message}
          </span>
        )}
      </div>

      {/* ─── ADMIN BUTTONS ────────────────────────────────────────────────────
          These only show when logged in as admin.
          Change "text-white/70" etc. to adjust admin icon colors.        */}
      {isAdmin && (
        <div className="flex items-center gap-2 shrink-0">
          {editing ? (
            <button
              onClick={saveEdit}
              className="p-1 rounded hover:bg-white/20 text-white transition"
              title="Save"
            >
              {/* ─── SAVE ICON — change Check to anything ─────────────────── */}
              <Check size={14} />
            </button>
          ) : (
            <button
              onClick={startEdit}
              className="p-1 rounded hover:bg-white/20 text-white transition"
              title="Edit message"
            >
              {/* ─── EDIT ICON — change Pencil to anything ────────────────── */}
              <Pencil size={14} />
            </button>
          )}
          <button
            onClick={toggleActive}
            className="p-1 rounded hover:bg-white/20 text-white transition"
            title={active ? "Hide from visitors" : "Show to visitors"}
          >
            {/* ─── TOGGLE ICON — Eye / EyeOff, swap for others if desired ── */}
            {active ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
