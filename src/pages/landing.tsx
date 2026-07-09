import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  Music,
  Palette,
  Sliders,
  Sparkles,
  ChevronRight,
  Facebook,
  Instagram,
  Youtube,
  Menu,
  X,
} from "lucide-react";
import { NEWSLETTER_FORM_ENDPOINT } from "@/lib/formspree";
import heroDemoVideo from "@assets/hero_demo_video.mp4";
import heroDemoVideoDesktop from "@assets/hero_demo_video_desktop.mp4";
import appLogo from "@assets/Tone_Chroma_Logo_1775747839600.jpg";
import showcaseVideo from "@assets/LandscapeInterfaceMediuml_1776024535574.mp4";
import microtonalMatrixImage from "@assets/LandscapeInterfaceCrop2_1776026182385.mp4";
import harmonicVisualizerVideo from "@assets/LissajousSmall_1776020529559.mp4";
import harmonicVisualizerRightVideo from "@assets/ConcurrentRotarySmall_1776025161452.mp4";
import harmonicVisualizerLeftVideo from "@assets/CounterCurrentRotarySmall_1776025787094.mp4";
import tuningExplorerVideo from "@assets/NoteInfoSmall_1776020689519.mp4";
import appStoreBadge from "@assets/Apple_Store_Icon_1775684838067.png";
import googlePlayBadge from "@assets/Google_Play_Icon_1775684910097.png";

// Replace with your live App Store / Google Play listing URLs once published.
const APP_STORE_URL = "#";
const GOOGLE_PLAY_URL = "#";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

function HeroVideo() {
  const isDesktop = useIsDesktop();
  const src = isDesktop ? heroDemoVideoDesktop : heroDemoVideo;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        key={src}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src={src}
      />
      <div className="absolute inset-0 bg-[#08091a]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08091a]/30 via-transparent to-[#08091a]/70" />
    </div>
  );
}

export default function Landing() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus("sending");
    try {
      const res = await fetch(NEWSLETTER_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      });
      if (!res.ok) throw new Error("Request failed");
      setNewsletterStatus("sent");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Features", action: "scroll", target: "about" },
    { label: "Setup", action: "scroll", target: "how-it-works" },
    { label: "Support", action: "navigate", target: "/support" },
    { label: "About", action: "navigate", target: "/about" },
  ] as const;

  return (
    <div
      className="min-h-screen bg-[#08091a] text-slate-100 overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ─── HEADER / NAV ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#08091a]/90 backdrop-blur-lg border-b border-white/5 shadow-lg shadow-black/20" : "bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="text-lg font-light tracking-[0.35em] uppercase landing-logo-gradient hover:opacity-80 transition-opacity"
          >
            Tonechroma
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() =>
                  link.action === "navigate"
                    ? navigate(link.target)
                    : scrollTo(link.target)
                }
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("waitlist")}
              className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white transition-all duration-200 shadow-lg shadow-violet-900/30 hover:shadow-violet-800/40"
            >
              Stay Connected
            </button>
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0c0d22]/95 backdrop-blur-lg border-t border-white/5 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  link.action === "navigate"
                    ? navigate(link.target)
                    : scrollTo(link.target);
                }}
                className="block w-full text-left text-slate-300 hover:text-white transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <hr className="border-white/10" />
            <button
              onClick={() => scrollTo("waitlist")}
              className="w-full px-5 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white"
            >
              Stay Connected
            </button>
          </div>
        )}
      </header>
      {/* ─── HERO ─── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-700/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-700/10 rounded-full blur-[120px]" />
        </div>

        <HeroVideo />

        <div className="relative z-10 max-w-4xl w-full mx-auto text-center space-y-8 flex flex-col items-center overflow-hidden">
          <div className="space-y-4 flex flex-col items-center w-full px-4 sm:px-0">
            <img
              src={appLogo}
              alt="Tonechroma Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover"
            />
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.25em] leading-[1.1] uppercase landing-logo-gradient whitespace-nowrap">
              T O N E C H R O M A
            </h1>
            <p className="text-base sm:text-xl text-slate-400 max-w-lg mx-auto leading-relaxed whitespace-nowrap">
              Interactive Visualizer | Microtonal Matrix
            </p>
          </div>

          <div className="flex flex-row items-center justify-center gap-4 w-full px-4 sm:px-0 mt-[0px]">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-[1.02] flex-shrink"
            >
              <img
                src={appStoreBadge}
                alt="Available on the App Store"
                className="block h-28 sm:h-40 w-auto max-w-[45vw] sm:max-w-none object-contain bg-transparent"
              />
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-[1.02] flex-shrink"
            >
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="block h-28 sm:h-40 w-auto max-w-[45vw] sm:max-w-none object-contain bg-transparent"
              />
            </a>
          </div>
        </div>
      </section>
      {/* ─── VALUE PROPOSITION / FEATURES ─── */}
      <section id="showcase" className="relative py-28 px-6 pt-[112px] pb-[112px]">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="mb-10">
            <div className="relative w-full sm:w-2/3 mx-auto aspect-video rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40">
              <video
                className="absolute inset-0 w-full h-full object-contain"
                src={showcaseVideo}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </RevealSection>

        </div>
      </section>
      {/* ─── WHAT IS TONECHROMA ─── */}
      <section id="about" className="relative py-28 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-800/8 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <RevealSection className="text-center space-y-8">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
              The Vision
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
              What is Tone Chroma?
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Tone Chroma is an interactive microtonal matrix for iOS and
                Android, crafted for 21st century musicians.
              </p>
              <p>Both musical instrument and visualizer, this innovative interface breaks through equal temperament's black-and-white and expands harmonic perception into a new universe of color. </p>
              <p className="text-slate-300">Enter new harmonic horizons by exploring pure frequency relationships and synesthetic displays which allow you to <em>hear</em> and <em>see</em> universal vibrational patterns. {" "}
              </p>
            </div>
          </RevealSection>
        </div>
      </section>
      {/* ─── VISUAL SHOWCASE ─── */}
      <section id="features" className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-400 mb-3">The Interface</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
              A New Way to Experience Harmony
            </h2>
          </RevealSection>

          <div className="hidden grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Palette,
                title: "Chromatic Interaction",
                desc: "Navigate pitch through an intuitive color-coded matrix — each harmonic limit mapped to a distinct hue, making intervallic relationships visible.",
                color: "from-rose-500/20 to-amber-500/20",
                iconColor: "text-rose-400",
              },
              {
                icon: Sliders,
                title: "Expressive Tuning",
                desc: "Move beyond equal temperament. Access Pythagorean, just intonation, septimal, and extended-limit tuning systems with precision.",
                color: "from-amber-500/20 to-emerald-500/20",
                iconColor: "text-amber-400",
              },
              {
                icon: Music,
                title: "Intuitive Exploration",
                desc: "An interface that encourages discovery. Press, hold, and layer tones to hear harmonic relationships unfold in real time.",
                color: "from-emerald-500/20 to-cyan-500/20",
                iconColor: "text-emerald-400",
              },
              {
                icon: Sparkles,
                title: "Living Visualizations",
                desc: "Watch your intervals come alive through harmonograph, Lissajous, cymatics, and lattice visualizations driven by the frequencies you play.",
                color: "from-blue-500/20 to-violet-500/20",
                iconColor: "text-blue-400",
              },
            ].map((feature, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="group relative h-full p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <feature.icon
                      className={`w-8 h-8 ${feature.iconColor} mb-4`}
                    />
                    <h3 className="text-lg font-medium mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Microtonal Matrix",
                subtitle:
                  "Navigate five harmonic limits across a color-coded grid of pure intervals",
                gradient: "from-violet-600/30 via-blue-600/20 to-cyan-600/10",
                accent: "border-violet-500/30",
              },
              {
                title: "Harmonic Visualizer",
                subtitle:
                  "Real-time geometric patterns that breathe with the frequencies you play",
                gradient: "from-rose-600/30 via-amber-600/20 to-yellow-600/10",
                accent: "border-rose-500/30",
                videos: [harmonicVisualizerVideo, harmonicVisualizerLeftVideo, harmonicVisualizerRightVideo],
              },
              {
                title: "Interval Explorer",
                subtitle:
                  "Discover harmonic intervals and their ratios, frequencies & pitch values",
                gradient: "from-emerald-600/30 via-teal-600/20 to-cyan-600/10",
                accent: "border-emerald-500/30",
              },
              {
                title: "MIDI Control",
                subtitle:
                  "Send MPE MIDI to external synths & DAWs or connect external controllers to express pitch",
                gradient: "from-indigo-600/30 via-purple-600/20 to-pink-600/10",
                accent: "border-indigo-500/30",
              },
            ].map((panel, i) => (
              <RevealSection key={i} delay={i * 120} className="h-full">
                <div
                  className={`group relative rounded-2xl overflow-hidden border ${panel.accent} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 h-full`}
                >
                  <div
                    className={`h-52 sm:h-60 lg:h-72 bg-gradient-to-br ${panel.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
                    <div className="w-[90%] h-[86%] rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      {panel.title === "Harmonic Visualizer" ? (
                        <div className="grid grid-cols-3 gap-2 w-full h-full p-2">
                          {(panel.videos ?? []).map((videoSrc, index) => (
                            <video
                              key={index}
                              className="w-full h-full object-contain rounded-md bg-black/20"
                              autoPlay
                              muted
                              loop
                              playsInline
                              src={videoSrc}
                            />
                          ))}
                        </div>
                      ) : panel.title === "Interval Explorer" ? (
                        <video
                          className="w-full h-full object-contain"
                          autoPlay
                          muted
                          loop
                          playsInline
                          src={tuningExplorerVideo}
                        />
                      ) : panel.title === "Microtonal Matrix" ? (
                        <video
                          className="w-full h-full object-contain"
                          autoPlay
                          muted
                          loop
                          playsInline
                          src={microtonalMatrixImage}
                        />
                      ) : (
                        <div className="grid grid-cols-6 gap-1 p-3">
                          {[...Array(24)].map((_, j) => {
                            const hue = (i * 120 + j * 15) % 360;
                            return (
                              <div
                                key={j}
                                className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-all duration-300 group-hover:scale-110"
                                style={{
                                  backgroundColor: `hsla(${hue}, 55%, 55%, ${0.3 + (j % 4) * 0.15})`,
                                }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 h-[88px] flex flex-col justify-center">
                    <h3 className="text-base font-medium mb-1">
                      {panel.title}
                    </h3>
                    <p className="text-sm text-slate-400">{panel.subtitle}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative py-28 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-violet-950/10 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <RevealSection className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-400 mb-3">
              Getting Started
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">
              How It Works
            </h2>
          </RevealSection>

          <div className="flex flex-col gap-6">
            {[
              {
                step: "01",
                title: "Choose a Tonal Center",
                desc: "Set your root note. Every ratio in the matrix recalculates around your chosen fundamental.",
                color: "text-violet-400",
                border: "border-violet-500/20",
                videoId: "YOUR_VIDEO_ID_1",
              },
              {
                step: "02",
                title: "Explore Interval Relationships",
                desc: "Move across harmonic limits — from pure Pythagorean fifths to septimal sevenths and beyond.",
                color: "text-blue-400",
                border: "border-blue-500/20",
                videoId: "YOUR_VIDEO_ID_2",
              },
              {
                step: "03",
                title: "Shape Musical Expression",
                desc: "Layer tones, adjust synth presets, and watch geometric visualizations respond to your intervals.",
                color: "text-cyan-400",
                border: "border-cyan-500/20",
                videoId: "YOUR_VIDEO_ID_3",
              },
              {
                step: "04",
                title: "Interval Explorer",
                desc: "Discover harmonic intervals and their ratios, frequencies & pitch values",
                color: "text-emerald-400",
                border: "border-emerald-500/20",
              },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div
                    className={`relative p-6 rounded-2xl bg-white/[0.02] border ${item.border} hover:bg-white/[0.04] transition-all duration-300`}
                  >
                    <span
                      className={`text-4xl font-extralight ${item.color} opacity-40 block mb-3`}
                    >
                      {item.step}
                    </span>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${item.videoId}`}
                      title={`Tonechroma Step ${i + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
      {/* ─── TESTIMONIAL / QUOTE ─── */}
      <section className="relative py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealSection className="text-center">
            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
              <blockquote className="text-xl sm:text-2xl font-light text-slate-200 leading-relaxed mb-6 italic">"I stopped thinking about notes as fixed points and started hearing them as positions in a spectrum. Tone Chroma changed how I listen."</blockquote>
              <div className="text-sm text-slate-500">
                <span className="text-slate-400">— Garrett A.</span>
                <span className="mx-2 opacity-30">·</span>
                <span>Composer & Sound Designer</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
      {/* ─── FINAL CTA / WAITLIST ─── */}
      <section id="waitlist" className="relative py-28 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-700/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-2xl mx-auto relative z-10 text-center space-y-8">
          <RevealSection>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-400 mb-3">
              Stay Connected
            </p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">Shape the Future</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Tone Chroma is evolving. Join the newsletter to receive updates,
              early access, and an invitation to shape the future of microtonal
              exploration.
            </p>
          </RevealSection>

          <RevealSection delay={150}>
            {newsletterStatus === "sent" ? (
              <p className="text-slate-300">Thanks — you're on the list.</p>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex flex-col items-stretch gap-3 w-full sm:w-fit mx-auto">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all duration-200 text-sm"
                  />
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    <button
                      type="submit"
                      disabled={newsletterStatus === "sending"}
                      className="w-full sm:w-auto px-7 py-3.5 text-sm font-medium rounded-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white transition-all duration-200 shadow-lg shadow-violet-900/30 hover:shadow-violet-800/40 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {newsletterStatus === "sending" ? "Joining..." : "Join Newsletter"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  {newsletterStatus === "error" && (
                    <p className="text-sm text-red-400 text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </form>
            )}
            <p className="text-xs text-slate-500 mt-4">Unsubscribe anytime.</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              {[
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/tonechroma.app" },
                { icon: Youtube, label: "YouTube", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href === "#" ? undefined : "_blank"}
                  rel={social.href === "#" ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={250}>
            <div className="pt-4" />
          </RevealSection>
        </div>
      </section>
      {/* ─── FOOTER ─── */}
      <footer className="relative border-t border-white/[0.06] py-16 px-6 pt-[20px] pb-[20px]">
        <div className="max-w-6xl mx-auto">
          <div className="pt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-xs text-slate-600">
                Copyright © {new Date().getFullYear()} Tonechroma. All rights reserved.
              </p>
              <a
                href="#"
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
