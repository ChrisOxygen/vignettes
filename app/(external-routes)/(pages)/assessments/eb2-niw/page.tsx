import { EB2NIWQuestionnaireForm } from "@/features/external-view/components";
import PagesHeader from "@/features/external-view/components/PagesHeader";
import React from "react";

function Eb2niwPage() {
  return (
    <main className="flex flex-col w-full">
      <PagesHeader title="EB-2 NIW Questionnaire" />

      {/* Form Section */}
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl w-full">
          <EB2NIWQuestionnaireForm />
        </div>
      </section>
    </main>
  );
}

export default Eb2niwPage;
