import { AdminSidebar } from "@/shared/components/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import React from "react";

function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminRootLayout;
