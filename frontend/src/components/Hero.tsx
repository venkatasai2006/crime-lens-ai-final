import { ArrowRight, Play, Sparkles, ShieldCheck, Activity } from "lucide-react";
import logo from "@/assets/crime-lens-logo.png";
import dashboard from "@/assets/dashboard-hero.png";

export function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-24 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary-glow/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-xs font-semibold text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Next-Gen Crime Intelligence
          </div>

          <div className="flex items-center gap-3 mb-6 lg:hidden">
            <img src={logo} alt="Crime Lens AI" className="h-14 w-14" />
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            <span className="text-foreground">AI-Powered</span><br />
            <span className="gradient-text-primary">Crime News</span><br />
            <span className="gradient-text-danger">Intelligence</span> Platform
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Crime Lens AI summarizes crime news articles, detects crime types, extracts entities like
            suspects and locations, and helps investigators analyze information using advanced NLP.
          </p>

          <p className="mt-3 text-sm font-semibold tracking-wide text-foreground/80 uppercase">
            See the <span className="text-danger">Truth</span>. Solve the <span className="text-danger">Crime</span>.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#analysis"
              className="group inline-flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold shadow-glow-blue hover:scale-105 transition-smooth">
              Analyze News <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
            </a>
            <a href="#dashboard"
              className="inline-flex items-center gap-2 glass-card text-foreground px-6 py-3.5 rounded-xl font-semibold hover:bg-white transition-smooth">
              <Play className="h-4 w-4 text-danger" /> View Demo
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <Stat icon={<ShieldCheck className="h-4 w-4" />} value="99.2%" label="Detection Accuracy" />
            <Stat icon={<Activity className="h-4 w-4" />} value="2.4M+" label="Articles Analyzed" />
            <Stat icon={<Sparkles className="h-4 w-4" />} value="50ms" label="Avg Response" />
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-6 bg-gradient-to-tr from-primary-glow/30 via-transparent to-danger/20 rounded-3xl blur-2xl" />
          <div className="relative glass-card rounded-3xl p-3 shadow-elegant animate-float">
            <img src={dashboard} alt="Crime Lens AI Dashboard preview" className="w-full h-auto rounded-2xl" />
            <div className="absolute top-6 right-6 glass px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-danger animate-pulse" /> LIVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-8 w-8 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center">{icon}</div>
      <div>
        <div className="font-display font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
