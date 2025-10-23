import ComingSoon from "@/features/external-view/components/ComingSoon";
import PagesHeader from "@/features/external-view/components/PagesHeader";

function UKVisaPage() {
  return (
    <div className="flex flex-col w-full">
      <PagesHeader title="UK Visa" />
      <ComingSoon
        title="UK Visa Services"
        description="Expert assistance with UK visa applications including student, work, and family visas. This page is currently under development."
      />
    </div>
  );
}

export default UKVisaPage;
