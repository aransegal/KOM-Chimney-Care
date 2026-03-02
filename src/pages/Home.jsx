import HeroSection from "../components/home/HeroSection";
import ServicesPricingSection from "../components/home/ServicesPricingSection";
import AboutSection from "../components/home/AboutSection";
import ContactSection from "../components/home/ContactSection";
import EmergencyPopup from "../components/home/EmergencyPopup";
import ReviewsStrip from "../components/home/ReviewsStrip";

export default function Home() {
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