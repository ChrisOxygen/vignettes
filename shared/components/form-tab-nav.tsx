"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { FORM_NAV } from "@/features/user/form/constants";
import { cn } from "@/shared/lib/utils";

export function FormTabNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Form Tabs</SidebarGroupLabel>
      <SidebarMenu>
        {FORM_NAV.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(item.url + "/");

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  "text-base font-medium transition-all duration-200 hover:bg-primary/10",
                  isActive &&
                    "bg-primary/10 text-sidebar-accent-foreground border-l-2 border-primary shadow-sm"
                )}
              >
                <Link href={item.url}>
                  <item.icon className="size-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
