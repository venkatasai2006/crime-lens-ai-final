import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/crime-lens-logo.png";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login — Crime Lens AI" },
      { name: "description", content: "Sign in to your Crime Lens AI investigator account." },
    ],
  }),
});

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "var(--gradient-hero)" }}>
      <div className="w-full max-w-md glass-card rounded-3xl p-8 shadow-elegant animate-fade-up">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <img src={logo} alt="Crime Lens AI" className="h-12 w-12" />
          <div>
            <div className="font-display font-bold text-lg">
              <span className="text-primary">Crime</span> <span className="text-danger">Lens</span> <span className="text-primary-glow">AI</span>
            </div>
            <div className="text-xs text-muted-foreground">Investigator portal</div>
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold mb-1">Welcome back</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to access the intelligence dashboard.</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Badge email" className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary-glow focus:ring-4 focus:ring-primary-glow/20 outline-none transition-smooth text-sm" />
          <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary-glow focus:ring-4 focus:ring-primary-glow/20 outline-none transition-smooth text-sm" />
          <button className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold shadow-glow-blue hover:scale-[1.02] transition-smooth">
            Sign in
          </button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Need an account? <a href="#" className="text-primary font-semibold">Request access</a>
        </p>
      </div>
    </div>
  );
}
