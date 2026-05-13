import { FileText, Tags, Users, Radio, Brain, BarChart3 } from "lucide-react";

const features = [
  { icon: FileText, title: "AI Crime Summarization", desc: "Compress lengthy crime articles into concise, fact-rich summaries in seconds.", color: "primary" },
  { icon: Tags, title: "Crime Type Detection", desc: "Automatically classify incidents — theft, assault, fraud, cybercrime and more.", color: "danger" },
  { icon: Users, title: "Entity Extraction", desc: "Pull out suspects, victims, locations, weapons and dates from raw text.", color: "primary" },
  { icon: Radio, title: "Real-Time Analysis", desc: "Stream and process breaking crime news as it hits the wire.", color: "danger" },
  { icon: Brain, title: "NLP Intelligence", desc: "Transformer models tuned for legal and investigative language.", color: "primary" },
  { icon: BarChart3, title: "AI Dashboard Analytics", desc: "Visualize patterns, hotspots and trends across regions and timeframes.", color: "danger" },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex glass-card px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4">FEATURES</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            A complete <span className="gradient-text-primary">intelligence toolkit</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Six AI capabilities working in concert to turn unstructured crime news into actionable insight.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isDanger = f.color === "danger";
            return (
              <div key={i}
                className="group glass-card rounded-2xl p-6 hover:-translate-y-2 transition-smooth hover:shadow-elegant relative overflow-hidden">
                <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-smooth ${isDanger ? "bg-danger/30" : "bg-primary-glow/30"}`} />
                <div className={`relative h-12 w-12 rounded-xl flex items-center justify-center mb-5 ${isDanger ? "gradient-danger shadow-glow-red" : "gradient-primary shadow-glow-blue"}`}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
