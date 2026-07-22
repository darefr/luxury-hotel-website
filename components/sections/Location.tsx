"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Car, Plane } from "lucide-react";

const details = [
  { icon: MapPin,  label: "Address",          value: "12 Velour Promenade, Côte d'Azur, Monaco 98000" },
  { icon: Phone,   label: "Reservations",     value: "+377 99 00 12 34" },
  { icon: Mail,    label: "Email",            value: "reserve@velour-co.com" },
  { icon: Clock,   label: "Concierge",        value: "Available 24 hours, 7 days a week" },
  { icon: Plane,   label: "Nearest Airport",  value: "Nice Côte d'Azur — 20 min by private transfer" },
  { icon: Car,     label: "Helipad",          value: "On-site helipad for direct arrivals" },
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
              Perfectly Positioned, Perfectly Private
            </h2>
            <div className="divider-copper w-16 mb-8 opacity-60" />
            <p className="font-sans text-sm text-ivory/50 leading-relaxed mb-10">
              Nestled on a secluded promontory above the Mediterranean, Velour &amp; Co. is
              accessible by road, yacht, or private helicopter. Our Concierge team
              coordinates seamless arrivals and departures for every guest.
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
              title="Velour & Co. Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11536.0!2d7.4246!3d43.7384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdc26e96a1c6c5%3A0x40819a5fd979a70!2sMonaco!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-5 left-5 glass border border-copper/20 px-4 py-3 flex items-center gap-3">
              <MapPin size={15} className="text-copper" />
              <span className="font-sans text-sm text-ivory">Velour &amp; Co., Monaco</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
