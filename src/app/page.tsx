import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import PromoStatBand from "@/components/PromoStatBand";
import Products from "@/components/Products";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutTeaser from "@/components/AboutTeaser";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CookieBanner from "@/components/CookieBanner";
import WhatsappFab from "@/components/WhatsappFab";

export default function Home() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <PromoStatBand />
          <Products />
          <TestimonialsSection />
          <AboutTeaser />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
        <CookieBanner />
        <WhatsappFab />
      </CartProvider>
    </LanguageProvider>
  );
}