"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Rooms & Suites",  href: "#rooms" },
  { label: "Dining",          href: "#dining" },
  { label: "Spa",             href: "#spa" },
  { label: "Experiences",     href: "#experiences" },
  { label: "Gallery",         href: "#gallery" },
  { label: "Events",          href: "#events" },
  { label: "Contact",         href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy",    href: "#" },
  { label: "Cookie Policy",     href: "#" },
  { label: "Terms & Conditions",href: "#" },
  { label: "Accessibility",     href: "#" },
];

// Inline SVG paths for social icons (brand icons unavailable in lucide)
const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={15} height={15} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15} aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98l5.75 3.02-5.75 3.02z"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

const socials = [
  { Icon: SocialIcons.Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: SocialIcons.Facebook,  href: "https://facebook.com",  label: "Facebook" },
  { Icon: SocialIcons.YouTube,   href: "https://youtube.com",   label: "YouTube" },
  { Icon: SocialIcons.Twitter,   href: "https://twitter.com",   label: "Twitter" },
];

export default function Footer() {
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-midnight border-t border-copper/10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-serif text-3xl tracking-[0.2em] text-ivory mb-2">
              VELOUR <span className="text-copper">&amp;</span> CO.
            </div>
            <p className="label-luxury text-[0.55rem] text-ivory/30 mb-5">Monaco — Est. 2004</p>
            <p className="font-sans text-sm text-ivory/45 leading-relaxed max-w-xs">
              A sanctuary for those who seek the extraordinary. Where every detail is a declaration of devotion.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-copper/15 flex items-center justify-center text-ivory/35
                             hover:text-copper hover:border-copper/60 transition-colors duration-300"
                  style={{ borderRadius: "2px" }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="label-luxury text-[0.55rem] text-copper mb-6">Explore</h3>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={e => smoothScroll(e, href)}
                    className="font-sans text-sm text-ivory/45 hover:text-copper transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="label-luxury text-[0.55rem] text-copper mb-6">Recognition</h3>
            <div className="space-y-4">
              {[
                ["Forbes Travel Guide",    "Five-Star Award 2019–2025"],
                ["Condé Nast Traveller",   "Gold List — Top 10 Europe"],
                ["Michelin Guide",         "Two Stars — Atelier Restaurant"],
                ["Green Globe",            "Platinum Sustainability Certified"],
              ].map(([org, award]) => (
                <div key={org} className="border-l-2 border-copper/30 pl-3">
                  <p className="font-sans text-sm text-ivory/70 font-medium">{org}</p>
                  <p className="font-sans text-xs text-ivory/30">{award}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="h-px bg-copper/10 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-ivory/25 text-xs">
            &copy; {new Date().getFullYear()} Velour &amp; Co. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {legalLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-sans text-ivory/25 text-xs hover:text-copper transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
