"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-midnight-2 relative overflow-hidden">
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #b87333 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="label-luxury mb-4">Stay in Touch</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            Offers &amp; Pokhara Travel Tips
          </h2>
          <p className="font-sans text-sm text-ivory/50 leading-relaxed mb-10">
            Leave your email to hear about seasonal rates at Hotel Sonam and handy tips for
            making the most of your visit to Pokhara. We value your privacy — no spam, ever.
          </p>

          {submitted ? (
            <motion.div
              className="flex items-center justify-center gap-3 text-copper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle size={22} />
              <span className="font-serif text-xl">Thank you. You are on the list.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-midnight-3 border border-copper/15 px-5 py-3.5 text-ivory
                             placeholder:text-ivory/25 focus:outline-none focus:border-copper/60
                             transition-colors duration-300 font-sans text-sm"
                />
                {error && <p className="text-red-400 text-xs mt-1 text-left">{error}</p>}
              </div>
              <motion.button
                type="submit"
                className="flex items-center justify-center gap-2 px-7 py-3.5 whitespace-nowrap
                           bg-copper text-midnight font-sans text-xs font-medium tracking-[0.18em] uppercase
                           hover:bg-copper-light transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Subscribe <ArrowRight size={14} />
              </motion.button>
            </form>
          )}

          <p className="font-sans text-ivory/25 text-xs mt-5">
            By subscribing you agree to our privacy policy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
