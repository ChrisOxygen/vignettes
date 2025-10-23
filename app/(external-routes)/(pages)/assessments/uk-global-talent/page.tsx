import PagesHeader from "@/features/external-view/components/PagesHeader";
import SectionTitle from "@/features/external-view/components/SectionTitle";
import React from "react";
import { FaUniversity, FaPalette, FaLaptopCode } from "react-icons/fa";

function UkGlobalTalentVisaAssessmentPage() {
  const sectors = [
    {
      icon: FaUniversity,
      title: "Academia and Research",
      description:
        "This is aimed at researchers, academic leaders or other experts in scientific fields",
    },
    {
      icon: FaPalette,
      title: "Arts & Culture",
      description:
        "For individuals in fields such as dance, music, theatre, visual arts, literature, fashion design, film and television",
    },
    {
      icon: FaLaptopCode,
      title: "Digital Technology",
      description:
        "For professionals working in the digital technology sectors including areas such as software engineering, data science and cybersecurity",
    },
  ];

  return (
    <main className="flex flex-col w-full">
      <PagesHeader title="UK Global Talent Visa" />

      {/* Introduction Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl flex flex-col gap-6 w-full">
          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            The UK Global Talent Visa is designed for individuals who are
            recognized as leaders or potential leaders in their field. This
            includes those in academia, research, arts and culture, and digital
            technology.
          </p>
        </div>
      </section>

      {/* Three Sectors Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 bg-gray-50">
        <div className="mx-auto py-16 sm:py-20 lg:py-26 max-w-7xl flex flex-col items-center gap-10 w-full">
          <SectionTitle
            subtitle="Visa Categories"
            title="These are three sectors covered under this Visa"
            className="max-w-3xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
            {sectors.map((sector) => {
              const IconComponent = sector.icon;
              return (
                <div
                  key={sector.title}
                  className="flex flex-col items-center gap-4 bg-white p-6 sm:p-8 rounded-xl border-2 border-gray-200 hover:border-primary hover:scale-[1.02] transition-all duration-300 group h-full"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="text-primary text-3xl sm:text-4xl" />
                  </div>
                  <div className="flex flex-col gap-3 text-center">
                    <h5 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {sector.title}
                    </h5>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {sector.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl flex flex-col gap-6 w-full">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Application Process
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            The Application process involves first obtaining an Endorsement from
            the relevant Endorsing Body. If approved, a Visa Application is
            submitted to the Home Office which will lead to a 3-year Visa after
            which you may be eligible for Indefinite Leave to Remain.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            This Visa does not require a Job Offer and offers flexibility in
            terms of whether you wish to be employed or establish your own
            business in the UK. Regardless of whether you are in paid employment
            of business, you can apply for global talent visa.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 py-16 sm:py-20 bg-primary/5">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 w-full text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Ready to Get Started?
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700 max-w-2xl">
            Please share your recently updated Resume with us for assessment.
          </p>
          <a
            href="mailto:ukgtv@insights4globaltalents.com"
            className="px-8 py-4 bg-primary text-white font-bold text-lg rounded-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            ukgtv@insights4globaltalents.com
          </a>
        </div>
      </section>
    </main>
  );
}

export default UkGlobalTalentVisaAssessmentPage;
