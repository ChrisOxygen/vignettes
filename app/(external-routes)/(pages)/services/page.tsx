import CTASection from "@/features/external-view/components/CTASection";
import PagesHeader from "@/features/external-view/components/PagesHeader";
import SectionTitle from "@/features/external-view/components/SectionTitle";
import TestimonialSection from "@/features/external-view/components/TestimonialSection";
import WhyChooseUsSection from "@/features/external-view/components/WhyChooseUsSection";
import { SERVICES_SNIPPET } from "@/features/external-view/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ServicesPage() {
  return (
    <main className="flex flex-col w-full">
      <PagesHeader
        title="Our Visa & Immigration Services"
        backgroundImage="/assets/imgi_4_hero-2.webp"
      />
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6">
        <div className="mx-auto py-16 sm:py-20 lg:py-26 max-w-7xl flex flex-col items-center gap-10 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-10 w-full">
            <SectionTitle
              subtitle="Visa Categories"
              title="Insights and Vignettes Outstanding Immigration Visa Services"
              className="flex-1"
              alignment="left"
            />
            <p className="text-base sm:text-lg max-w-full lg:max-w-xl text-gray-600 leading-relaxed">
              We offer study abroad application and processing services to help
              students who want to Study Abroad. We assist and support our
              clients to secure admission into institutions abroad including the
              United Kingdom (UK), United States of America (USA), Canada,
              Australia, Ireland, United Arab Emirate (UAE), Ukraine, Germany,
              Cyprus, Spain.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {SERVICES_SNIPPET.map((service, index) => (
              <Link key={service.title} href={service.link} className="flex">
                <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray/20 hover:border-primary hover:scale-[1.02] transition-all duration-300 group w-full h-full">
                  <Image
                    src={`/assets/service-snippet-img-${index + 1}.webp`}
                    alt={service.title}
                    width={700}
                    height={700}
                    className=" object-cover object-center w-full h-[200px] rounded-lg flex-shrink-0"
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <h5 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h5>
                    <span className="text-gray-600">{service.description}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <WhyChooseUsSection />
      <CTASection />
      <TestimonialSection />
    </main>
  );
}

export default ServicesPage;
