import { useState } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "/#about" },
  { label: "Setup", href: "/#how-it-works" },
  { label: "Support", href: "/support" },
  { label: "About", href: "/about" },
] as const;

export function SiteHeader({ scrolled = true }: { scrolled?: boolean }) {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (href: string) => {
    setMobileMenuOpen(false);
    navigate(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08091a]/90 backdrop-blur-lg border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => handleNav("/")}
          className="text-lg font-light tracking-[0.35em] uppercase landing-logo-gradient hover:opacity-80 transition-opacity"
        >
          Tonechroma
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("/#waitlist")}
            className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white transition-all duration-200 shadow-lg shadow-violet-900/30 hover:shadow-violet-800/40"
          >
            Join Newsletter
          </button>
        </div>

        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0d22]/95 backdrop-blur-lg border-t border-white/5 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="block w-full text-left text-slate-300 hover:text-white transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          <hr className="border-white/10" />
          <button
            onClick={() => handleNav("/#waitlist")}
            className="w-full px-5 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white"
          >
            Join Newsletter
          </button>
        </div>
      )}
    </header>
  );
}
