import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Member, insertMemberSchema } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

export default function Admin() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; role: string }>({ name: "", role: "" });

  const { data: members, isLoading } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Member> }) => {
      const res = await apiRequest("PATCH", `/api/members/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/members"] });
      setEditingId(null);
      toast({
        title: "Success",
        description: "Team member updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEdit = (member: Member) => {
    setEditingId(member.id);
    setEditValues({ name: member.name, role: member.role });
  };

  const handleSave = (id: number) => {
    mutation.mutate({ id, data: editValues });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">Team Management</h1>
      <div className="grid gap-6">
        {members?.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-end gap-4">
                <div className="flex-1 w-full space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <Input
                    value={editingId === member.id ? editValues.name : member.name}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    disabled={editingId !== member.id}
                  />
                </div>
                <div className="flex-1 w-full space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <Input
                    value={editingId === member.id ? editValues.role : member.role}
                    onChange={(e) => setEditValues({ ...editValues, role: e.target.value })}
                    disabled={editingId !== member.id}
                  />
                </div>
                <div className="flex gap-2">
                  {editingId === member.id ? (
                    <Button 
                      onClick={() => handleSave(member.id)}
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                      Save
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => handleEdit(member)}>
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
