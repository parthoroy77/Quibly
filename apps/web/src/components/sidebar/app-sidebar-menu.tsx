"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@quibly/ui/components/sidebar";
import { cn } from "@quibly/ui/lib/utils";
import { BadgeCheck, CreditCard, FileStack, Inbox, Send } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Inbox,
    isActive: true,
  },
  {
    title: "Quizzes",
    url: "/quizzes",
    icon: FileStack,
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

const AppSidebarMenu = () => {
  const pathname = usePathname();
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent className="px-1.5 md:px-0">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: true,
                    }}
                    className={cn(
                      "px-2.5 md:px-2 cursor-pointer",
                      pathname === item.url && "bg-sidebar-accent [&_svg]:text-primary dark:text-white"
                    )}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AppSidebarMenu;
