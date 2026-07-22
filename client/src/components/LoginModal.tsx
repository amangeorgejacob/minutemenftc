import { useState } from "react";
import { X, LogOut } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!open) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");

      const visitorMsgId = sessionStorage.getItem("visitorMsgId");
      if (visitorMsgId) {
        sessionStorage.removeItem("visitorMsgId");
        fetch("/api/visit/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messageId: visitorMsgId }),
        }).catch(() => {});
      }

      sessionStorage.setItem("adminPinged", "true");
      fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: window.location.pathname, isAdmin: true }),
      }).catch(() => {});

      setError("");
      setUsername("");
      setPassword("");
      onClose();
      window.location.reload();
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    sessionStorage.removeItem("adminPinged");
    onClose();
    window.location.reload();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background border border-foreground/10 rounded-xl p-6 w-72 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground">
            {isAdmin ? "Admin Panel" : "Admin Login"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isAdmin ? (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              You are logged in as <span className="text-primary font-semibold">admin</span>.
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-bold hover:bg-destructive/90 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-foreground/10 text-foreground text-sm focus:outline-none focus:border-primary transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-secondary/30 border border-foreground/10 text-foreground text-sm focus:outline-none focus:border-primary transition-all"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
