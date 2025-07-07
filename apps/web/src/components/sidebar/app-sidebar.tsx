import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@quibly/ui/components/sidebar";
import { BadgeCheck, CreditCard, File, Inbox, Send } from "lucide-react";
import Logo from "../ui/logo";
import AppSidebarFooter from "./app-sidebar-footer";
import AppSidebarMenu from "./app-sidebar-menu";

const navItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Inbox,
    isActive: true,
  },
  {
    title: "Quizzes",
    url: "#",
    icon: File,
    isActive: false,
  },
  {
    title: "Activities",
    url: "#",
    icon: Send,
    isActive: false,
  },
  {
    title: "Billing",
    url: "#",
    icon: CreditCard,
    isActive: false,
  },
  {
    title: "Account",
    url: "#",
    icon: BadgeCheck,
    isActive: false,
  },
];

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
