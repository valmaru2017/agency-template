import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IntroStatement from "./components/IntroStatement";
import Rituals from "./components/Rituals";
import TheSpace from "./components/TheSpace";
import GalleryMosaic from "./components/GalleryMosaic";
import WhatToExpect from "./components/WhatToExpect";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";

export default function DelfosPage() {
  return (
    <ScrollAnimations>
      <Navbar />
      <main>
        <Hero />
        <IntroStatement />
        <Rituals />
        <TheSpace />
        <GalleryMosaic />
        <WhatToExpect />
        <BookingForm />
      </main>
      <Footer />
    </ScrollAnimations>
  );
}
