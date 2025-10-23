import ComingSoon from "@/features/external-view/components/ComingSoon";
import PagesHeader from "@/features/external-view/components/PagesHeader";

function WorkVisaPage() {
  return (
    <div className="flex flex-col w-full">
      <PagesHeader title="Work Visa" />
      <ComingSoon
        title="Work Visa Services"
        description="Professional support for securing employment visas and work permits globally. This page is currently under development."
      />
    </div>
  );
}

export default WorkVisaPage;
