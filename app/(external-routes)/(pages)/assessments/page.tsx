import React from "react";
import PagesHeader from "@/features/external-view/components/PagesHeader";
import SectionTitle from "@/features/external-view/components/SectionTitle";

function AssessmentsPage() {
  return (
    <main className="flex flex-col w-full">
      <PagesHeader />

      {/* Free Assessments Information Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-3">
            <SectionTitle
              subtitle="Free Assessments"
              title="Lets determine your eligibility for distinguished visas"
              className="max-w-4xl mb-4"
              alignment="left"
            />

            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
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

          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            Our assessments are designed to evaluate your background,
            accomplishments, and qualifications to guide you toward the most
            strategic and achievable immigration pathway. Our firm is committed
            to providing clear, honest insight into your options before you
            begin the application process.
          </p>

          <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mt-4">
            <p className="text-base sm:text-lg leading-relaxed text-gray-900 font-medium">
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
