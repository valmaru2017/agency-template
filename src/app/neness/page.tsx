import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import About from "./components/About";
import Recognition from "./components/Recognition";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Services from "./components/Services";
import MobileService from "./components/MobileService";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";

export default function NenessPage() {
  return (
    <ScrollAnimations>
      <Navbar />
      <main>
        <Hero />
        <MobileService />
        <CategoryGrid />
        <Services />
        <About />
        <Recognition />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </ScrollAnimations>
  );
}
