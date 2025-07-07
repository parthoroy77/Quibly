import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@quibly/ui/components/sidebar";
import { BadgeCheck, Box, CreditCard, File, Inbox, Send } from "lucide-react";
import Link from "next/link";
import AppSidebarFooter from "./app-sidebar-footer";

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
    <Sidebar className="border-none">
      <SidebarHeader className="h-14 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" variant={"default"} className="hover:text-foreground" asChild>
              <Link href={DEFAULT_LOGIN_REDIRECT} className="flex-1 ">
                <Box size={26} className="shrink-0 !size-6" color="var(--primary)" />
                <span className="text-2xl font-bold tracking-wider">
                  <span className="font-mono font-normal">Q</span>
                  <span className="font-instrumental">uibly</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: true,
                    }}
                    className="px-2.5 md:px-2"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
