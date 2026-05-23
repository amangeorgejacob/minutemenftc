import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type SectionId = "youtube" | "sponsors" | "community" | "faq" | "portfolio";

export function useVisibility() {
  return useQuery<Record<SectionId, boolean>>({
    queryKey: ["/api/visibility"],
    queryFn: async () => {
      const res = await fetch("/api/visibility");
      if (!res.ok) throw new Error("Failed to fetch visibility");
      return res.json();
    },
    staleTime: 0,
  });
}

export function useToggleVisibility() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ sectionId, visible }: { sectionId: SectionId; visible: boolean }) => {
      const res = await fetch("/api/visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId, visible }),
      });
      if (!res.ok) throw new Error("Failed to update visibility");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/visibility"] });
    },
  });
}
