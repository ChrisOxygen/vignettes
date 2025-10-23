import ComingSoon from "@/features/external-view/components/ComingSoon";
import PagesHeader from "@/features/external-view/components/PagesHeader";

function GermanyVisaPage() {
  return (
    <div className="flex flex-col w-full">
      <PagesHeader title="Germany Visa" />
      <ComingSoon
        title="Germany Visa Services"
        description="Complete support for Germany visa applications including work permits and study visas. This page is currently under development."
      />
    </div>
  );
}

export default GermanyVisaPage;
