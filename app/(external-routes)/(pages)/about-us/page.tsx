import AboutSection from "@/features/external-view/components/AboutSection";
import CTASection from "@/features/external-view/components/CTASection";
import PagesHeader from "@/features/external-view/components/PagesHeader";
import ServicesSection from "@/features/external-view/components/ServicesSection";
import TestimonialSection from "@/features/external-view/components/TestimonialSection";
import WhyChooseUsSection from "@/features/external-view/components/WhyChooseUsSection";
import React from "react";

function AboutUsPage() {
  return (
    <main className="flex flex-col w-full">
      <PagesHeader />
      <div className="pt-20">
        <AboutSection />
      </div>
      <ServicesSection />
      <WhyChooseUsSection />
      <CTASection />
      <TestimonialSection />
    </main>
  );
}

export default AboutUsPage;
