"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 1:00 PM (until 10:00 PM) and check-out is by 12:00 PM noon. If you expect to arrive outside these hours, please let us know in advance.",
  },
  {
    q: "Do you offer an airport shuttle?",
    a: "Yes, an airport shuttle is available on request. Please share your arrival details when you book so we can help arrange your transfer.",
  },
  {
    q: "Is parking available?",
    a: "Yes. Hotel Sonam has a car park on the property, and parking is free for our guests.",
  },
  {
    q: "What room types are available?",
    a: "We offer Double Rooms and Family Rooms. Each room has a private balcony, air conditioning, and a flat-screen TV with satellite channels, and all rooms are non-smoking.",
  },
  {
    q: "Is there a swimming pool?",
    a: "No, Hotel Sonam does not have a swimming pool.",
  },
  {
    q: "Can I cancel my reservation?",
    a: "Hotel Sonam offers free cancellation. For the exact terms that apply to your booking, please contact the hotel directly.",
  },
  {
    q: "How far is the hotel from Phewa Lake and Lakeside?",
    a: "Phewa Lake is about a 6-minute walk away, and Pokhara's Lakeside area is roughly an 18-minute walk. The city centre is around a 30-minute walk from the hotel.",
  },
  {
    q: "Is there a restaurant at the hotel?",
    a: "Yes, we have an on-site restaurant serving Nepali and continental dishes. There is also a wide choice of cafes and restaurants a short walk away in Lakeside.",
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
