import PagesHeader from "@/features/external-view/components/PagesHeader";
import { EB1AQuestionnaireForm } from "@/features/external-view/components/EB1AQuestionnaireForm";
import React from "react";

function UsEb1aPage() {
  return (
    <main className="flex flex-col w-full">
      <PagesHeader title="EB-1A Questionnaire" />

      {/* Form Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl w-full">
          <EB1AQuestionnaireForm />
        </div>
      </section>
    </main>
  );
}

export default UsEb1aPage;
