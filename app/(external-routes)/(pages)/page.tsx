import AboutSection from "@/features/external-view/components/AboutSection";
import HeroSection from "@/features/external-view/components/HeroSection";
import ServicesSection from "@/features/external-view/components/ServicesSection";
import SupportedCountriesSection from "@/features/external-view/components/SupportedCountriesSection";
import TestimonialSection from "@/features/external-view/components/TestimonialSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <SupportedCountriesSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialSection />
    </main>
  );
}
