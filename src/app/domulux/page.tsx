import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedGrid from "./components/FeaturedGrid";
import TrustStrip from "./components/TrustStrip";
import AboutPaula from "./components/AboutPaula";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";

export default function DomuluxPage() {
  return (
    <ScrollAnimations>
      <Navbar />
      <main>
        <Hero />
        <FeaturedGrid />
        <TrustStrip />
        <AboutPaula />
      </main>
      <Footer />
    </ScrollAnimations>
  );
}
