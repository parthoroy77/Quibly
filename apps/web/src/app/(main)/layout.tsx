import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarHeader from "@/components/sidebar/app-sidebar-header";
import { SidebarProvider } from "@quibly/ui/components/sidebar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-sidebar p-2">
        <section className="h-full overflow-hidden bg-background w-full rounded-xl border">
          <AppSidebarHeader />
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
