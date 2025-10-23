import PagesHeader from "@/features/external-view/components/PagesHeader";
import SectionTitle from "@/features/external-view/components/SectionTitle";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import SupportedCountriesSection from "@/features/external-view/components/SupportedCountriesSection";
import TestimonialSection from "@/features/external-view/components/TestimonialSection";
import CTASection from "@/features/external-view/components/CTASection";
import { PARTNER_INSTITUTIONS } from "@/features/external-view/constants";

function PartnerInstitutionPage() {
  return (
    <main className="flex flex-col w-full">
      <PagesHeader
        title="Our Trusted Partner Institutions Worldwide"
        backgroundImage="/assets/imgi_2_hero-1.webp"
      />
      <SupportedCountriesSection />
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6">
        <div className="mx-auto pt-12 pb-20 sm:pt-16 sm:pb-26 lg:pt-20 lg:pb-60 max-w-7xl flex flex-col items-center gap-8 sm:gap-10 w-full">
          <SectionTitle
            subtitle="Partner Institutions"
            title="We are in Partnership with over 300 Global Institutions"
            className="max-w-4xl"
          />

          <div className="w-full max-w-4xl space-y-6">
            <div className="prose prose-slate max-w-none">
              <p className="text-sm sm:text-base text-muted-foreground text-center mb-6 sm:mb-8 leading-relaxed px-2">
                Insights and Vignettes Limited (IVL) is Nigeria&apos;s leading
                immigration and education consultancy, operating in Lagos,
                Nigeria, with Representatives in some African Countries,
                including Ghana and Kenya. We keep this list updated as we grow
                in operations and in partnership with institutions abroad.
                Please contact us if you cannot find a preferred institution on
                this list.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {Object.entries(PARTNER_INSTITUTIONS).map(
                ([country, institutions]) => (
                  <AccordionItem key={country} value={country}>
                    <AccordionTrigger className="text-lg sm:text-xl font-semibold hover:no-underline py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-left">
                        <span>{country}</span>
                        <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                          ({institutions.length} institutions)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 pt-4">
                        {institutions.map((institution) => (
                          <li
                            key={institution}
                            className="flex items-start gap-2 text-xs sm:text-sm"
                          >
                            <span className="text-primary mt-1 flex-shrink-0">
                              •
                            </span>
                            <span className="leading-relaxed">
                              {institution}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </div>
        </div>
      </section>
      <CTASection />
      <TestimonialSection />
    </main>
  );
}

export default PartnerInstitutionPage;
