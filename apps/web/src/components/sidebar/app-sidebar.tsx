import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@quibly/ui/components/sidebar";
import Logo from "../ui/logo";
import AppSidebarFooter from "./app-sidebar-footer";
import AppSidebarMenu from "./app-sidebar-menu";

const AppSidebar = () => {
  return (
    <Sidebar className="border-none *:px-1">
      <SidebarHeader className="h-14 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" variant={"default"} className="hover:text-foreground" asChild>
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <AppSidebarMenu />
      <AppSidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
