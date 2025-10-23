import PagesHeader from "@/features/external-view/components/PagesHeader";
import { EB1AQuestionnaireForm } from "@/features/external-view/components/EB1AQuestionnaireForm";
import React from "react";
import Link from "next/link";

function UsEb1aPage() {
  return (
    <main className="flex flex-col w-full">
      <PagesHeader title="EB-1A Questionnaire" />

      {/* Form Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl w-full">
          <EB1AQuestionnaireForm />
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

export default UsEb1aPage;
