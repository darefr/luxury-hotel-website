"use client";

import { motion } from "framer-motion";
import { Users, Utensils, BedDouble, MapPin } from "lucide-react";

const team = [
  {
    role: "Front Desk & Reservations",
    bio: "Our reception team handles bookings, check-in (from 1:00 PM) and check-out, and is always happy to share local tips.",
    icon: Users,
  },
  {
    role: "Kitchen & Restaurant",
    bio: "The team behind our on-site restaurant, preparing Nepali favourites and familiar continental dishes each day.",
    icon: Utensils,
  },
  {
    role: "Housekeeping",
    bio: "Keeping our non-smoking rooms clean, comfortable and ready so you can simply relax during your stay.",
    icon: BedDouble,
  },
  {
    role: "Guest Support",
    bio: "Glad to help arrange airport shuttles, taxis and day trips around Pokhara whenever you need a hand.",
    icon: MapPin,
  },
];

export default function Team() {
  return (
    <section id="team" className="py-28 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="label-luxury mb-4">The Hotel Sonam Team</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            The People Who Look After You
          </h2>
          <p className="text-ivory/50 font-sans text-sm max-w-md mx-auto leading-relaxed">
            A small, friendly team dedicated to making your stay easy and comfortable.
          </p>
          <div className="divider-copper w-16 mx-auto mt-6 opacity-60" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="group text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="relative w-44 h-44 mx-auto mb-6 rounded-full flex items-center justify-center border-2 border-copper/20 bg-midnight-3 group-hover:border-copper transition-colors duration-500">
                <member.icon size={48} className="text-copper/70 group-hover:text-copper transition-colors duration-500" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl text-ivory mb-1">{member.role}</h3>
              <p className="label-luxury text-[0.55rem] text-copper mb-3">Hotel Sonam</p>
              <p className="font-sans text-xs text-ivory/45 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
