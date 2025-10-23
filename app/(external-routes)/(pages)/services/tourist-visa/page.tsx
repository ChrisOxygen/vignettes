import ComingSoon from "@/features/external-view/components/ComingSoon";
import PagesHeader from "@/features/external-view/components/PagesHeader";

function TouristVisaPage() {
  return (
    <div className="flex flex-col w-full">
      <PagesHeader title="Tourist Visa" />
      <ComingSoon
        title="Tourist Visa Services"
        description="Hassle-free tourist visa services for your perfect vacation abroad. This page is currently under development."
      />
    </div>
  );
}

export default TouristVisaPage;
