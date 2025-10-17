import { FormLayoutContent } from "@/features/user/form/components/forms";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";

function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="">
          <FormLayoutContent>{children}</FormLayoutContent>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default FormLayout;
