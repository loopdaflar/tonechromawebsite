import { useState } from "react";
import { Link } from "wouter";
import { Send, CheckCircle, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SUPPORT_FORM_ENDPOINT } from "@/lib/formspree";

export default function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(SUPPORT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#08091a] text-slate-100 flex flex-col">
      <SiteHeader />

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="w-full max-w-lg">
          {submitted ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-light">Message Sent</h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Thank you for reaching out, {name}. We will get back to you at{" "}
                {email} as soon as we can.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to home
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
                  Need Support?
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Have a question or feedback? We are here to help. Fill out the
                  form below and we will get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-slate-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-slate-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-slate-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200 text-sm resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={!isFormValid || sending}
                  className="w-full flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium rounded-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white transition-all duration-200 shadow-lg shadow-violet-900/30 hover:shadow-violet-800/40 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
