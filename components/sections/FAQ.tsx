"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is the check-in and check-out time?",
    a: "Check-in begins at 3:00 PM and check-out is at 12:00 PM noon. Early check-in and late check-out are available upon request, subject to availability, and may be arranged complimentarily for suite guests.",
  },
  {
    q: "Do you offer airport transfers?",
    a: "Yes. We offer private chauffeur-driven transfers in our fleet of Mercedes S-Class and Bentley Bentayga vehicles. Transfers are available 24/7 and should be booked at least 48 hours in advance.",
  },
  {
    q: "Is the spa available to non-resident guests?",
    a: "The Velour Spa & Thermal Sanctuary is open to day visitors by appointment. We recommend booking at least one week in advance, as capacity is intentionally limited to preserve an atmosphere of exclusivity.",
  },
  {
    q: "What dining experiences do you offer?",
    a: "Velour & Co. is home to three distinct culinary destinations: Atelier (fine dining, Michelin-starred), The Copper Lounge (all-day bistro), and Jardin Terrace (seasonal outdoor dining). In-suite dining is available around the clock.",
  },
  {
    q: "Are children and pets welcome?",
    a: "We warmly welcome children of all ages. Our Concierge team can arrange private tutors, kids' club access, and custom menus. Pets are accommodated in select suites — please notify us at the time of booking.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Reservations may be cancelled without penalty up to 72 hours before arrival. Cancellations within 72 hours are subject to a one-night charge. Long-stay reservations of 7+ nights require 14 days' notice.",
  },
  {
    q: "Do you have event and wedding facilities?",
    a: "Our Grand Ballroom and three private event salons accommodate intimate gatherings to celebrations of 400 guests. Our dedicated events team handles every detail — from floral installations to bespoke menus — with uncompromising precision.",
  },
  {
    q: "Is there a dress code?",
    a: "We encourage smart elegant attire in our fine dining venues during dinner service. The rest of the property is relaxed luxury — we simply ask that guests feel comfortable and confident.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-midnight-3 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="label-luxury mb-4">Frequently Asked Questions</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            Everything You Need to Know
          </h2>
          <div className="divider-copper w-16 mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="border border-copper/15 overflow-hidden"
              style={{ borderRadius: "3px" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left
                           bg-midnight-2 hover:bg-midnight-3 transition-colors duration-300 group"
                aria-expanded={openIndex === i}
              >
                <span className="font-serif text-lg text-ivory group-hover:text-copper transition-colors duration-300">
                  {item.q}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-copper/30 flex items-center justify-center text-copper">
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 py-5 bg-midnight-3 border-t border-copper/10">
                      <p className="text-ivory/55 font-sans text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
