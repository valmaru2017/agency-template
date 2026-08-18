import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import About from "./components/About";
import Recognition from "./components/Recognition";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";

export default function NenessPage() {
  return (
    <ScrollAnimations>
      <Navbar />
      <main>
        <Hero />
        <Recognition />
        <CategoryGrid />
        <Services />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </ScrollAnimations>
  );
}
