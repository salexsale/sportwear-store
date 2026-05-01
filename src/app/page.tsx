import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Navbar />
        <main>
          <Hero />
          <Products />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </LanguageProvider>
  );
}