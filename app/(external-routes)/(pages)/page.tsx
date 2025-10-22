import HeroSection from "@/features/external-view/components/HeroSection";
import ServicesSection from "@/features/external-view/components/ServicesSection";
import TestimonialSection from "@/features/external-view/components/TestimonialSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <ServicesSection />
      <TestimonialSection />
    </main>
  );
}
