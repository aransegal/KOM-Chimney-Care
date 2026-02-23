import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import PricingSection from "../components/home/PricingSection";
import AboutSection from "../components/home/AboutSection";
import KomUsaSection from "../components/home/KomUsaSection";
import ContactSection from "../components/home/ContactSection";
import EmergencyPopup from "../components/home/EmergencyPopup";
import ReviewsStrip from "../components/home/ReviewsStrip";

export default function Home() {
  return (
    <>
      <EmergencyPopup />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <ReviewsStrip />
      <AboutSection />
      <KomUsaSection />
      <ContactSection />
    </>
  );
}