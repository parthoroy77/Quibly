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
import { UserRole } from "@quibly/utils/types";
import { Icon, IconChartDots3, IconProps } from "@tabler/icons-react";
import { BadgeCheck, CreditCard, FileStack, Inbox, LucideProps, Send } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type NavItem = {
  title: string;
  url: string;
  icon:
    | ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  role?: UserRole;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Inbox,
  },
  {
    title: "Quizzes",
    url: "/quizzes",
    icon: FileStack,
    role: "educator",
  },
  {
    title: "Quiz Sessions",
    url: "/quiz-sessions",
    icon: IconChartDots3,
    role: "educator",
  },
  {
    title: "Activities",
    url: "#",
    icon: Send,
  },
  {
    title: "Billing",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Account",
    url: "#",
    icon: BadgeCheck,
  },
];

const AppSidebarMenu = ({ role }: { role: UserRole }) => {
  const pathname = usePathname();
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent className="px-1.5 md:px-0">
          <SidebarMenu>
            {navItems
              .filter((item) => !item.role || role === item.role)
              .map((item) => (
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
