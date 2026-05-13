import { useState } from "react";
import { Link2, Loader2, Sparkles, MapPin, AlertTriangle, Calendar, Users, FileText, ShieldAlert } from "lucide-react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";



export function AnalysisPanel() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyze = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!url) return;

  setLoading(true);
  setResult(null);

  try {
    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    });

    const data = await response.json();
    await addDoc(collection(db, "crime_reports"), {
  ...data,
  url,
  userId: auth.currentUser?.uid || "guest",
  createdAt: serverTimestamp(),
});

    setResult(data);
  } catch (error) {
    console.error("Error:", error);
  }

  setLoading(false);
};

  return (
    <section id="analysis" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex glass-card px-4 py-1.5 rounded-full text-xs font-semibold text-danger mb-4">AI ANALYSIS</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Paste a URL. Get <span className="gradient-text-danger">instant intelligence</span>.
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-elegant">
          <form onSubmit={analyze} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://news.example.com/crime/article"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-border focus:border-primary-glow focus:ring-4 focus:ring-primary-glow/20 outline-none transition-smooth text-sm"
              />
            </div>
            <button type="submit" disabled={loading}
              className="inline-flex items-center justify-center gap-2 gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-glow-blue hover:scale-105 transition-smooth disabled:opacity-70 disabled:hover:scale-100">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </form>

          {loading && (
            <div className="mt-8 relative h-32 rounded-xl bg-secondary overflow-hidden border border-border">
              <div className="absolute inset-x-0 h-1 gradient-primary animate-scan" />
              <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Running NLP pipeline...
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up">
              <ResultCard icon={<ShieldAlert />} label="Crime Type" value={result.crime_type} accent="danger" />
              <ResultCard icon={<MapPin />} label="Location" value={result.location} />
              <ResultCard icon={<Calendar />} label="Date" value={result.date} />
              <ResultCard icon={<Users />} label="Suspects" value={result.suspects} />
              <ResultCard icon={<AlertTriangle />} label="Risk Level" value={result.risk_level} accent="danger" highlight />
              <ResultCard icon={<FileText />} label="Summary" value={result.summary} className="sm:col-span-2 lg:col-span-1" />
            </div>
          )}

          {!loading && !result && (
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Try it: paste any crime news URL above to see the demo result.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ResultCard({ icon, label, value, accent, highlight, className = "" }:
  { icon: React.ReactNode; label: string; value: string; accent?: "danger"; highlight?: boolean; className?: string }) {
  return (
    <div className={`rounded-2xl p-5 border transition-smooth hover:-translate-y-1 ${highlight ? "gradient-danger text-danger-foreground border-transparent shadow-glow-red" : "bg-white border-border hover:shadow-card"} ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`h-7 w-7 rounded-lg flex items-center justify-center [&>svg]:h-4 [&>svg]:w-4 ${highlight ? "bg-white/20" : accent === "danger" ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"}`}>
          {icon}
        </span>
        <span className={`text-[11px] font-semibold uppercase tracking-wider ${highlight ? "text-white/80" : "text-muted-foreground"}`}>{label}</span>
      </div>
      <div className={`text-sm font-medium leading-snug ${highlight ? "text-white" : "text-foreground"}`}>{value}</div>
    </div>
  );
}
