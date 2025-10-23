import { EB2NIWQuestionnaireForm } from "@/features/external-view/components";
import PagesHeader from "@/features/external-view/components/PagesHeader";
import Link from "next/link";
import React from "react";

function Eb2niwPage() {
  return (
    <main className="flex flex-col w-full">
      <PagesHeader title="EB-2 NIW Questionnaire" />

      {/* Form Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl w-full ">
          <EB2NIWQuestionnaireForm />

          {/* Help Text */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 text-center">
              Experiencing difficulties with the form?{" "}
              <Link
                href="/contact-us"
                className="text-primary font-semibold hover:underline"
              >
                Reach out to us
              </Link>{" "}
              and we'll be happy to assist you.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Eb2niwPage;
