"use client";

import { motion } from "framer-motion";
import { PhoneCall, MessageSquare, Globe } from "lucide-react";

const channels = [
  { icon: PhoneCall,     label: "Call Us",   value: "+977 985-1019065",  sub: "Front desk & reservations" },
  { icon: MessageSquare, label: "WhatsApp",  value: "Message Us",        sub: "Quick replies during the day" },
  { icon: Globe,         label: "Online",    value: "Send an Enquiry",   sub: "Use our contact form below" },
];

export default function Concierge() {
  return (
    <section className="py-16 bg-copper relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #0a0f1e 0, #0a0f1e 1px, transparent 0, transparent 50%)",
          backgroundSize: "8px 8px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-xs uppercase tracking-widest text-midnight/60 mb-2">Here to Help</p>
            <h2 className="font-serif text-3xl md:text-4xl text-midnight font-light leading-tight text-balance">
              Questions? We&apos;re<br />Happy to Help.
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {channels.map(({ icon: Icon, label, value, sub }, i) => (
              <div key={i} className="flex items-center gap-4 bg-midnight/10 px-5 py-4 backdrop-blur-sm" style={{ borderRadius: "2px" }}>
                <div className="w-10 h-10 rounded-full bg-midnight/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-midnight" />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-midnight/55 mb-0.5">{label}</p>
                  <p className="font-sans font-semibold text-midnight text-sm">{value}</p>
                  <p className="font-sans text-midnight/55 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
