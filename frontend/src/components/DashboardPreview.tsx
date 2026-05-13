import { TrendingUp, TrendingDown, AlertCircle, MapPin, Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const stats = [
  { label: "Active Cases", value: "1,284", change: "+12%", up: true },
  { label: "Resolved Today", value: "87", change: "+24%", up: true },
  { label: "High Risk Alerts", value: "23", change: "-8%", up: false },
  { label: "AI Confidence", value: "94.2%", change: "+1.4%", up: true },
];

const feed = [
  { type: "Burglary", loc: "Westside, LA", time: "2m ago", risk: "Medium" },
  { type: "Cybercrime", loc: "Online · NY Bank", time: "8m ago", risk: "High" },
  { type: "Assault", loc: "Downtown, Houston", time: "15m ago", risk: "High" },
  { type: "Fraud", loc: "Miami Beach, FL", time: "32m ago", risk: "Low" },
  { type: "Vandalism", loc: "Midtown, Atlanta", time: "1h ago", risk: "Low" },
];

const insights = [
  { title: "Crime spike detected", desc: "+38% theft incidents in 5th precinct over the last 72h.", tone: "danger" as const },
  { title: "Pattern match", desc: "Vehicle description matches 3 prior cases in adjacent districts.", tone: "primary" as const },
  { title: "Forecast", desc: "Model predicts elevated risk Friday 8–11pm in entertainment zones.", tone: "primary" as const },
];

export function DashboardPreview() {
  const [reports, setReports] = useState<any[]>([]);

useEffect(() => {
  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "crime_reports"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(data);

      setReports(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchReports();
}, []);
  return (
    <section id="dashboard" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex glass-card px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4">DASHBOARD</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Command center for <span className="gradient-text-primary">modern policing</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition-smooth">
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{s.label}</div>
              <div className="mt-2 flex items-end justify-between">
                <div className="font-display text-3xl font-bold">{s.value}</div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${s.up ? "text-primary" : "text-danger"}`}>
                  {s.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />} {s.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Heatmap + chart */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-lg flex items-center gap-2"><MapPin className="h-4 w-4 text-danger" /> Crime Heatmap</h3>
                <p className="text-xs text-muted-foreground">Last 24 hours · live</p>
              </div>
              <div className="flex gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">7D</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">30D</span>
              </div>
            </div>
            <Heatmap />
            <MiniChart />
          </div>

          {/* Feed */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-danger animate-pulse" /> Recent Crime Feed
            </h3>
            <div className="space-y-3">
              {reports.map((f: any, i) => (
  <div
    key={i}
    className="flex items-center gap-3 p-3 rounded-xl bg-white/60 hover:bg-white transition-smooth border border-border"
  >
    <div
      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
        f.risk_level === "High"
          ? "bg-danger/10 text-danger"
          : "bg-primary/10 text-primary"
      }`}
    >
      <AlertCircle className="h-5 w-5" />
    </div>

    <div className="flex-1 min-w-0">
      <div className="text-sm font-semibold truncate">
        {f.crime_type}
      </div>

      <div className="text-xs text-muted-foreground truncate">
        {f.location}
      </div>
    </div>

    <span
      className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
        f.risk_level === "High"
          ? "bg-danger/10 text-danger"
          : "bg-primary/10 text-primary"
      }`}
    >
      {f.risk_level}
    </span>
  </div>
))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {insights.map((ins, i) => (
            <div key={i} className={`glass-card rounded-2xl p-5 border-l-4 ${ins.tone === "danger" ? "border-danger" : "border-primary-glow"}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Brain className={`h-4 w-4 ${ins.tone === "danger" ? "text-danger" : "text-primary"}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">AI Insight</span>
              </div>
              <div className="font-display font-bold">{ins.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{ins.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Heatmap() {
  // 7x14 grid
  const rows = 7, cols = 18;
  const cells = Array.from({ length: rows * cols }, (_, i) => {
    const v = Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.9));
    return v;
  });
  return (
    <div className="grid gap-1 mb-6" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
      {cells.map((v, i) => {
        const isHot = v > 0.6;
        const isMed = v > 0.3 && v <= 0.6;
        return (
          <div key={i}
            className={`aspect-square rounded-[3px] transition-smooth hover:scale-125 ${isHot ? "bg-danger" : isMed ? "bg-primary-glow" : "bg-secondary"}`}
            style={{ opacity: 0.3 + v * 0.7 }}
          />
        );
      })}
    </div>
  );
}

function MiniChart() {
  const points = [20, 35, 28, 50, 42, 65, 58, 72, 60, 80, 70, 90];
  const max = Math.max(...points);
  return (
    <div className="flex items-end gap-1.5 h-24">
      {points.map((p, i) => (
        <div key={i} className="flex-1 rounded-t-md gradient-primary opacity-80 hover:opacity-100 transition-smooth"
          style={{ height: `${(p / max) * 100}%` }} />
      ))}
    </div>
  );
}
