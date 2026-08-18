"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const events = [
  {
    title: "Family & Group Stays",
    description:
      "Travelling as a family or group? Our Double and Family rooms make it easy to stay together. Ask us about booking several rooms for your party.",
    image: "/images/family-room.png",
    tag: "Group Bookings",
  },
  {
    title: "Small Gatherings",
    description:
      "Our garden, rooftop terrace and restaurant are pleasant spots for a small get-together over food and tea. [Editable placeholder — confirm capacity and details.]",
    image: "/images/garden-terrace.png",
    tag: "Restaurant & Garden",
  },
  {
    title: "Plan With Us",
    description:
      "For special occasions or group meals, contact our front desk and we will do our best to help arrange the details of your visit.",
    image: "/images/restaurant.png",
    tag: "Enquiries",
  },
];

export default function Events() {
  return (
    <section id="events" className="py-28 bg-midnight-3 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="label-luxury mb-4">Groups &amp; Gatherings</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            Staying Together
          </h2>
          <div className="divider-copper w-16 mx-auto mt-6 opacity-60" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden bg-midnight-2 border border-copper/10"
              style={{ borderRadius: "4px" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              whileHover={{ y: -6 }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={ev.image}
                  alt={ev.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-2 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 label-luxury text-[0.55rem] text-copper bg-midnight/80 px-3 py-1 backdrop-blur-sm">
                  {ev.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-ivory mb-3">{ev.title}</h3>
                <p className="font-sans text-xs text-ivory/50 leading-relaxed mb-5">{ev.description}</p>
                <button className="flex items-center gap-2 text-copper font-sans text-xs tracking-widest uppercase hover:gap-4 transition-all duration-300">
                  Enquire Now <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
