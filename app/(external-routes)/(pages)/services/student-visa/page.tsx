import ComingSoon from "@/features/external-view/components/ComingSoon";
import PagesHeader from "@/features/external-view/components/PagesHeader";

function StudentVisaPage() {
  return (
    <div className="flex flex-col w-full">
      <PagesHeader title="Study Abroad" />
      <ComingSoon
        title="Study Abroad Services"
        description="Expert guidance for international students pursuing academic dreams worldwide. This page is currently under development."
      />
    </div>
  );
}

export default StudentVisaPage;
