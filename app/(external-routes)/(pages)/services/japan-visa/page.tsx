import ComingSoon from "@/features/external-view/components/ComingSoon";
import PagesHeader from "@/features/external-view/components/PagesHeader";

function JapanVisaPage() {
  return (
    <div className="flex flex-col w-full">
      <PagesHeader title="Japan Visa" />
      <ComingSoon
        title="Japan Visa Services"
        description="Professional assistance with Japan visa applications for work, study, and tourism. This page is currently under development."
      />
    </div>
  );
}

export default JapanVisaPage;
