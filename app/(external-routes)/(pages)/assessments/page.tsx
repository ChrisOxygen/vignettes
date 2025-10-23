import React from "react";
import PagesHeader from "@/features/external-view/components/PagesHeader";
import SectionTitle from "@/features/external-view/components/SectionTitle";

function AssessmentsPage() {
  return (
    <main className="flex flex-col w-full">
      <PagesHeader
        title="Free Visa Eligibility Assessments"
        backgroundImage="/assets/imgi_39_01.webp"
      />

      {/* Free Assessments Information Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl flex flex-col gap-6 sm:gap-8 w-full">
          <div className="flex flex-col gap-4 sm:gap-6">
            <SectionTitle
              subtitle="Free Assessments"
              title="Let's determine your eligibility for distinguished visas"
              className="max-w-4xl mb-2 sm:mb-4"
              alignment="left"
            />

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
              At Insights and Vignettes Limited, we have designed systems that
              provide talents with the right information, materials and tools.
              We offer free preliminary assessments to help individuals
              determine their eligibility for distinguished visa categories,
              including the{" "}
              <span className="font-semibold text-gray-900">
                UK Global Talent Visa
              </span>
              ,{" "}
              <span className="font-semibold text-gray-900">
                EB-2 NIW (National Interest Waiver)
              </span>
              , and{" "}
              <span className="font-semibold text-gray-900">
                EB-1A (Extraordinary Ability Green Card)
              </span>
              .
            </p>
          </div>

          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
            Our assessments are designed to evaluate your background,
            accomplishments, and qualifications to guide you toward the most
            strategic and achievable immigration pathway. Our firm is committed
            to providing clear, honest insight into your options before you
            begin the application process.
          </p>

          <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4 sm:p-6 mt-2 sm:mt-4">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-900 font-medium">
              Should we find your profile viable, we will schedule you for a
              complimentary call.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AssessmentsPage;
