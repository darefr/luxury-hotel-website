import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ScrollProgress, BackToTop, WhatsAppFAB } from "@/components/layout/FloatingUI";

import Hero from "@/components/sections/Hero";
import BookingBar from "@/components/sections/BookingBar";
import Rooms from "@/components/sections/Rooms";
import Amenities from "@/components/sections/Amenities";
import Dining from "@/components/sections/Dining";
import Spa from "@/components/sections/Spa";
import Experiences from "@/components/sections/Experiences";
import SpecialOffers from "@/components/sections/SpecialOffers";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Statistics from "@/components/sections/Statistics";
import Awards from "@/components/sections/Awards";
import Sustainability from "@/components/sections/Sustainability";
import FAQ from "@/components/sections/FAQ";
import Location from "@/components/sections/Location";
import Events from "@/components/sections/Events";
import Team from "@/components/sections/Team";
import Concierge from "@/components/sections/Concierge";
import Contact from "@/components/sections/Contact";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      {/* Global floating UI */}
      <LoadingScreen />
      <ScrollProgress />
      <BackToTop />
      <WhatsAppFAB />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        {/* 1. Cinematic hero — video + image fallback */}
        <Hero />

        {/* 2. Booking bar — sticky below hero */}
        <BookingBar />

        {/* 3. Rooms & Suites */}
        <Rooms />

        {/* 4. Statistics — animated counters */}
        <Statistics />

        {/* 5. Amenities */}
        <Amenities />

        {/* 6. Dining */}
        <Dining />

        {/* 7. Spa & Wellness */}
        <Spa />

        {/* 8. Experiences */}
        <Experiences />

        {/* 9. Special Offers */}
        <SpecialOffers />

        {/* 10. Gallery — masonry + lightbox */}
        <Gallery />

        {/* 11. Testimonials */}
        <Testimonials />

        {/* 12. Awards marquee */}
        <Awards />

        {/* 13. Sustainability */}
        <Sustainability />

        {/* 14. Events & Venues */}
        <Events />

        {/* 15. Team */}
        <Team />

        {/* 16. Concierge strip */}
        <Concierge />

        {/* 17. FAQ */}
        <FAQ />

        {/* 18. Location */}
        <Location />

        {/* 19. Contact */}
        <Contact />

        {/* 20. Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
