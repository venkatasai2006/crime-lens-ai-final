import { Mail, MapPin, Phone, Twitter, Github, Linkedin, Facebook } from "lucide-react";
import logo from "@/assets/crime-lens-logo.png";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export function Contact() {

  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "contact_messages"), {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
    });

    alert("Message Sent 🔥");

    setName("");
    setEmail("");
    setMessage("");
  } catch (error) {
    console.log(error);

    alert("Failed to send message 😭");
  }
};
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto glass-card rounded-3xl p-8 sm:p-12 shadow-elegant">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex glass-card px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4">CONTACT</div>
            <h2 className="font-display text-4xl font-bold tracking-tight">
              Get In <span className="gradient-text-danger">Touch</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have questions, feedback, or suggestions about Crime Lens AI? Send us a message and we’ll get back to you soon.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href="mailto:hungryfacts03@gmail.com" className="flex items-center gap-3 hover:text-primary transition-smooth"><Mail className="h-4 w-4 text-primary" /> hungryfacts03@gmail.com</a>
              <a href="tel:+919121417744" className="flex items-center gap-3 hover:text-primary transition-smooth"><Phone className="h-4 w-4 text-primary" /> +91 9121417744</a>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Andhra Pradesh, India</div>
            </div>
            <div className="mt-6 inline-flex glass-card px-4 py-1.5 rounded-full text-xs font-semibold text-primary">
              Built for AI4AP Internship Demonstration
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary-glow focus:ring-4 focus:ring-primary-glow/20 outline-none transition-smooth text-sm"
  placeholder="Full name"
/>
            <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary-glow focus:ring-4 focus:ring-primary-glow/20 outline-none transition-smooth text-sm"
  placeholder="Work email"
/>
            <textarea
  rows={4}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  className="w-full px-4 py-3 rounded-xl bg-white border border-border focus:border-primary-glow focus:ring-4 focus:ring-primary-glow/20 outline-none transition-smooth text-sm"
  placeholder="Enter your message"
/>
            <button className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold shadow-glow-blue hover:scale-[1.02] transition-smooth">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pb-8">
      <div className="max-w-7xl mx-auto glass-card rounded-3xl p-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Crime Lens AI" className="h-10 w-10" />
              <div className="font-display font-bold">
                <span className="text-primary">Crime</span> <span className="text-danger">Lens</span> <span className="text-primary-glow">AI</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">See the truth. Solve the crime.</p>
          </div>

          <FooterCol title="Platform" links={["Features", "AI Analysis", "Dashboard", "Pricing"]} />
          <FooterCol title="Company" links={["About", "Careers", "Press", "Contact"]} />
          <div>
            <div className="font-display font-bold mb-3">Follow</div>
            <div className="flex gap-2">
              {[Twitter, Github, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-lg glass flex items-center justify-center hover:gradient-primary hover:text-primary-foreground transition-smooth">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <p className="text-[11px] leading-relaxed text-muted-foreground/80 max-w-3xl">
            Disclaimer: This project is an independent AI research and demonstration project and is not officially affiliated with any police department.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Crime Lens AI · Built for AI4AP Internship Demonstration</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="font-display font-bold mb-3">{title}</div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l) => <li key={l}><a href="#" className="hover:text-foreground transition-smooth">{l}</a></li>)}
      </ul>
    </div>
  );
}
