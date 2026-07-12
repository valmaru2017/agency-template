import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Services from "./components/Services";
import RecentProjects from "./components/RecentProjects";
import WhyRhino from "./components/WhyRhino";
import QuoteForm from "./components/QuoteForm";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";

export default function RhinoPage() {
  return (
    <ScrollAnimations>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <RecentProjects />
        <WhyRhino />
        <QuoteForm />
      </main>
      <Footer />
    </ScrollAnimations>
  );
}
