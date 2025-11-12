import ComingSoon from "@/features/external-view/components/ComingSoon";
import PagesHeader from "@/features/external-view/components/PagesHeader";

function BusinessVisaPage() {
  return (
    <div className="flex flex-col w-full">
      <PagesHeader title="Business Plans and Travels" />
      <ComingSoon
        title="Business Plans and Travels Services"
        description="Streamlined business visa applications for entrepreneurs and corporate travelers. This page is currently under development."
      />
    </div>
  );
}

export default BusinessVisaPage;
