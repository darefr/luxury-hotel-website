"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Car, Plane } from "lucide-react";

const details = [
  { icon: MapPin,  label: "Address",          value: "Simalchaur, Syampati 45210, Pokhara, Nepal" },
  { icon: Phone,   label: "Reservations",     value: "+977 985-1019065" },
  { icon: Clock,   label: "Check-in / out",   value: "Check-in from 1:00 PM · Check-out by 12:00 PM" },
  { icon: Car,     label: "Parking",          value: "Free parking on the property" },
  { icon: Plane,   label: "Airport Shuttle",  value: "Available on request" },
  { icon: Mail,    label: "Getting Around",   value: "6-min walk to Phewa Lake · 18 min to Lakeside" },
];

export default function Location() {
  return (
    <section id="location" className="py-28 bg-midnight relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px divider-copper opacity-30" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="label-luxury mb-4">Find Us</p>
            <h2 className="font-serif text-5xl md:text-6xl font-light text-ivory mb-5">
              In the Heart of Pokhara
            </h2>
            <div className="divider-copper w-16 mb-8 opacity-60" />
            <p className="font-sans text-sm text-ivory/50 leading-relaxed mb-10">
              Hotel Sonam sits in the quiet Simalchaur neighbourhood of Pokhara, just a
              short walk from Phewa Lake and the lively Lakeside area. It&apos;s an easy
              base for exploring the lake, Sarangkot and everything the valley has to offer.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {details.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <div className="w-10 h-10 border border-copper/30 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderRadius: "2px" }}>
                    <Icon size={16} className="text-copper" />
                  </div>
                  <div>
                    <p className="label-luxury text-[0.55rem] text-copper mb-1">{label}</p>
                    <p className="font-sans text-sm text-ivory/70 leading-relaxed">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: map embed */}
          <motion.div
            className="relative h-[480px] overflow-hidden border border-copper/15"
            style={{ borderRadius: "4px" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <iframe
              title="Hotel Sonam Location"
              src="https://www.google.com/maps?q=Hotel%20Sonam%20Simalchaur%20Pokhara&output=embed"
              className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-5 left-5 glass border border-copper/20 px-4 py-3 flex items-center gap-3">
              <MapPin size={15} className="text-copper" />
              <span className="font-sans text-sm text-ivory">Hotel Sonam, Pokhara</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
