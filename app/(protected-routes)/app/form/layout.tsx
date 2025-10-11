import { AppSidebar } from "@/shared/components/app-sidebar";
import { FormLayoutContent } from "@/features/user/form/components/forms";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { FormProvider } from "@/features/user/form/context";

function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <FormProvider>
          <FormLayoutContent>{children}</FormLayoutContent>
        </FormProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default FormLayout;
