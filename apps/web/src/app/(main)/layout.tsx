import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarHeader from "@/components/sidebar/app-sidebar-header";
import { SidebarProvider } from "@quibly/ui/components/sidebar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="bg-sidebar p-2">
      <AppSidebar />
      <main className="flex-1 bg-background h-full rounded-xl overflow-hidden border flex flex-col">
        <AppSidebarHeader />
        <section className="h-[calc(100svh-16px-48px)] overflow-y-scroll scrollbar-hidden">{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
