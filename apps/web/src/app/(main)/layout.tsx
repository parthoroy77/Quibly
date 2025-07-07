import AppSidebar from "@/components/sidebar/app-sidebar";
import AppSidebarInset from "@/components/sidebar/app-sidebar-inset";
import { SidebarProvider } from "@quibly/ui/components/sidebar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-sidebar p-1 ">
        <section className="h-full overflow-hidden bg-background w-full rounded-xl border">
          <AppSidebarInset />
          {/* <header className=" flex justify-between items-center ">
            <SidebarTrigger />
            <ThemeToggle />
          </header> */}
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
