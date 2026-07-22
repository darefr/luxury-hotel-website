"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
  };

  const inputCls =
    "w-full bg-midnight-3 border border-copper/15 px-4 py-3 text-ivory placeholder:text-ivory/25 focus:outline-none focus:border-copper/60 transition-colors duration-300 font-sans text-sm";

  return (
    <section id="contact" className="py-28 bg-midnight-3 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="label-luxury mb-4">Get in Touch</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
              Begin Your Stay with a Conversation
            </h2>
            <div className="divider-copper w-16 mb-8 opacity-60" />
            <p className="font-sans text-sm text-ivory/50 leading-relaxed mb-10">
              Whether you are planning your first visit or returning as a cherished guest,
              our team is ready to craft every detail to perfection. Reach out — we respond
              within four hours, always personally.
            </p>
            <div className="space-y-4">
              {[
                ["Reservations", "+377 99 00 12 34"],
                ["Email", "reserve@velour-co.com"],
                ["Concierge WhatsApp", "+377 99 00 12 35"],
              ].map(([label, val]) => (
                <div key={label} className="flex items-center gap-6">
                  <span className="label-luxury text-[0.55rem] text-copper w-36">{label}</span>
                  <span className="font-sans text-sm text-ivory/60">{val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <CheckCircle size={52} className="text-copper mb-6" />
                <h3 className="font-serif text-3xl text-ivory mb-3">Message Received</h3>
                <p className="font-sans text-sm text-ivory/50 max-w-xs">
                  Thank you, {form.name}. A member of our Concierge team will be in touch within four hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-midnight-2 border border-copper/10 p-8" style={{ borderRadius: "4px" }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input className={inputCls} placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input className={inputCls} placeholder="Email Address *" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <input className={inputCls} placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                <select
                  className={inputCls}
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" disabled>Select Subject</option>
                  <option>Room Reservation</option>
                  <option>Spa Booking</option>
                  <option>Dining Reservation</option>
                  <option>Events &amp; Weddings</option>
                  <option>General Enquiry</option>
                </select>
                <div>
                  <textarea className={`${inputCls} resize-none h-32`} placeholder="Your Message *" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4
                             bg-copper text-midnight font-sans text-xs font-medium tracking-[0.2em] uppercase
                             hover:bg-copper-light transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Send Message <Send size={14} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
