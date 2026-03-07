import { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import ServicesPricingSection from "../components/home/ServicesPricingSection";
import AboutSection from "../components/home/AboutSection";
import ContactSection from "../components/home/ContactSection";
import EmergencyPopup from "../components/home/EmergencyPopup";
import ReviewsStrip from "../components/home/ReviewsStrip";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <>
      <EmergencyPopup />
      <HeroSection />
      <ServicesPricingSection />
      <ReviewsStrip />
      <AboutSection />
      <ContactSection />
    </>
  );
}