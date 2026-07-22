import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { X, Megaphone, Pencil, Check, Eye, EyeOff } from "lucide-react";

type NotificationData = { message: string; active: boolean };

export function NotificationBanner() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem("notifDismissed") === "true"
  );
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/notification"] }),
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

  if (!isAdmin && (!active || dismissed)) return null;

  function handleDismiss() {
    sessionStorage.setItem("notifDismissed", "true");
    setDismissed(true);
  }

  function startEdit() {
    setDraft(message);
    setEditing(true);
  }

  function saveEdit() {
    if (draft.trim()) {
      mutation.mutate({ message: draft.trim() });
    }
    setEditing(false);
  }

  function toggleActive() {
    mutation.mutate({ active: !active });
  }

  return (
    <div
      className={`w-full z-50 px-4 py-2.5 flex items-center gap-3 text-sm transition-all duration-300 ${
        active
          ? "bg-foreground/10 border-b border-foreground/20 text-foreground"
          : "bg-muted border-b border-border text-muted-foreground"
      }`}
    >
      <Megaphone size={15} className="shrink-0 text-accent" />

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
          <span className={active ? "" : "line-through opacity-50"}>
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

      {!isAdmin && active && (
        <button
          onClick={handleDismiss}
          className="p-1 rounded hover:bg-foreground/10 text-muted-foreground transition shrink-0"
          title="Dismiss"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
