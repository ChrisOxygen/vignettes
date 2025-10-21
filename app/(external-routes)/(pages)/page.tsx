import HeroSection from "@/features/external-view/components/HeroSection";
import ServicesSection from "@/features/external-view/components/ServicesSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <ServicesSection />
    </main>
  );
}
