import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import logo from "@/assets/crime-lens-logo.png";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { signOut } from "firebase/auth";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "AI Analysis", href: "#analysis" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);
  const handleLogout = async () => {
  await signOut(auth);

  alert("Logged Out 👋");
};
  const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    console.log(result.user);

    await setDoc(doc(db, "users", result.user.uid), {
  name: result.user.displayName,
  email: result.user.email,
  photo: result.user.photoURL,
  uid: result.user.uid,
});

    alert("Login Success 🔥");
  } catch (error) {
    console.log(error);

    alert("Login Failed 😭");
  }
};
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav className="glass max-w-7xl mx-auto rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-elegant">
        <a href="#home" className="flex items-center gap-2 group">
          <img src={logo} alt="Crime Lens AI" className="h-10 w-10 object-contain transition-smooth group-hover:scale-110" />
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-bold text-base">
              <span className="text-primary">Crime</span> <span className="text-danger">Lens</span> <span className="text-primary-glow">AI</span>
            </div>
            <div className="text-[10px] text-muted-foreground tracking-wider uppercase">See the truth</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-lg hover:bg-accent transition-smooth">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
         {user ? (
  <div className="hidden sm:flex items-center gap-3">
    <img
  src={user.photoURL || "https://i.pravatar.cc/150?img=3"}
  alt="profile"
  referrerPolicy="no-referrer"
  className="h-10 w-10 rounded-full border-2 border-primary object-cover"
/>

    <button
      onClick={handleLogout}
      className="gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold"
    >
      Logout
    </button>
  </div>
) : (
  <button
    onClick={handleGoogleLogin}
    className="hidden sm:inline-flex items-center gap-2 gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-glow-blue hover:scale-105 transition-smooth"
  >
    <LogIn className="h-4 w-4" /> Login
  </button>
)}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-accent" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden glass max-w-7xl mx-auto mt-2 rounded-2xl p-4 shadow-elegant animate-fade-up">
          <div className="flex flex-col">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium hover:bg-accent rounded-lg">{l.label}</a>
            ))}
            <button
  onClick={handleGoogleLogin}
  className="mt-2 gradient-primary text-primary-foreground px-4 py-3 rounded-lg text-sm font-semibold text-center"
>
  Login
</button>
          </div>
        </div>
      )}
    </header>
  );
}
