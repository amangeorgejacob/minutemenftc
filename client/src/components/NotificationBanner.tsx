import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Megaphone, Pencil, Check, Eye, EyeOff } from "lucide-react";

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
      className={`w-full px-4 py-3 flex items-center gap-3 text-sm font-medium border-b transition-colors duration-300 ${
        active
          ? "bg-destructive text-destructive-foreground border-destructive"
          : "bg-muted border-border text-muted-foreground opacity-60"
      }`}
    >
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
            className="w-full bg-transparent border-b border-accent outline-none resize-none text-sm leading-snug"
          />
        ) : (
          <span className={active ? "" : "line-through"}>
            {message}
          </span>
        )}
      </div>

      {isAdmin && (
        <div className="flex items-center gap-2 shrink-0">
          {editing ? (
            <button
              onClick={saveEdit}
              className="p-1 rounded hover:bg-accent/20 text-accent transition"
              title="Save"
            >
              <Check size={14} />
            </button>
          ) : (
            <button
              onClick={startEdit}
              className="p-1 rounded hover:bg-accent/20 text-accent transition"
              title="Edit message"
            >
              <Pencil size={14} />
            </button>
          )}
          <button
            onClick={toggleActive}
            className={`p-1 rounded transition ${
              active
                ? "hover:bg-accent/20 text-accent"
                : "hover:bg-muted-foreground/20 text-muted-foreground"
            }`}
            title={active ? "Hide from visitors" : "Show to visitors"}
          >
            {active ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
