import ComingSoon from "@/features/external-view/components/ComingSoon";
import PagesHeader from "@/features/external-view/components/PagesHeader";

function CanadaVisaPage() {
  return (
    <div className="flex flex-col w-full">
      <PagesHeader title="Canada Visa" />
      <ComingSoon
        title="Canada Visa Services"
        description="Comprehensive visa services for Canada including work, student, and visitor visas. This page is currently under development."
      />
    </div>
  );
}

export default CanadaVisaPage;
