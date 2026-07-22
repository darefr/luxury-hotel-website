"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Isabelle Morin",
    role: "General Manager",
    bio: "Former Director at The Ritz Paris, Isabelle brings 22 years of ultra-luxury hospitality leadership.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Chef Marcus Veil",
    role: "Executive Chef",
    bio: "Two Michelin stars. Trained under Alain Ducasse, Marcus leads our culinary identity with quiet brilliance.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
  },
  {
    name: "Lena Hartmann",
    role: "Spa Director",
    bio: "Certified in Ayurveda and traditional Thai medicine, Lena curates transformative wellness journeys.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Alexei Volkov",
    role: "Head Concierge",
    bio: "With connections spanning 60 countries, Alexei turns the impossible into a pleasant surprise.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
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
          <p className="label-luxury mb-4">The Velour Team</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
            Masters of Their Craft
          </h2>
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
              <div className="relative w-44 h-44 mx-auto mb-6 rounded-full overflow-hidden border-2 border-copper/20 group-hover:border-copper transition-colors duration-500">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="176px"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-xl text-ivory mb-1">{member.name}</h3>
              <p className="label-luxury text-[0.55rem] text-copper mb-3">{member.role}</p>
              <p className="font-sans text-xs text-ivory/45 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
