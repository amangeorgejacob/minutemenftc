import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useSponsors() {
  return useQuery({
    queryKey: [api.sponsors.list.path],
    queryFn: async () => {
      const res = await fetch(api.sponsors.list.path);
      if (!res.ok) throw new Error("Failed to fetch sponsors");
      return api.sponsors.list.responses[200].parse(await res.json());
    },
  });
}

export function useContactForm() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.submit.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to send message");
      }
      return api.contact.submit.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
