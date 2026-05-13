import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Contact, Footer } from "@/components/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Crime Lens AI — See The Truth. Solve The Crime." },
      { name: "description", content: "AI-powered crime news intelligence platform. Summarize articles, detect crime types, extract entities and analyze information using NLP." },
      { property: "og:title", content: "Crime Lens AI — AI-Powered Crime Intelligence" },
      { property: "og:description", content: "Summarize crime news, detect crime types, extract suspects and locations with AI." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AnalysisPanel />
        <DashboardPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
