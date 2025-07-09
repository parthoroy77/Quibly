"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@quibly/ui/components/breadcrumb";
import { Separator } from "@quibly/ui/components/separator";
import { SidebarTrigger } from "@quibly/ui/components/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import ThemeToggle from "../ui/theme-toggle";

const AppSidebarHeader = () => {
  const pathname = usePathname();
  const paths = pathname.split("/")?.filter((x) => x);
  const formattedPaths = [
    ...paths.map((name, index) => {
      const path = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: name.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2"),
        path,
      };
    }),
  ];

  return (
    <header className="bg-background sticky top-0 justify-between flex shrink-0 items-center gap-2 h-12 border-b py-2 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="text-xs">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {formattedPaths.length > 0 && <BreadcrumbSeparator />}
            {formattedPaths.length > 0 &&
              formattedPaths.map(({ label, path }, i) => (
                <React.Fragment key={i}>
                  <BreadcrumbItem className="text-xs">
                    <BreadcrumbLink href={path} className="capitalize">
                      {label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {i + 1 < formattedPaths.length && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default AppSidebarHeader;
