"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@quibly/ui/components/breadcrumb";
import { Separator } from "@quibly/ui/components/separator";
import { SidebarInset, SidebarTrigger } from "@quibly/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/theme-toggle";

const AppSidebarInset = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const label = decodeURIComponent(segment).replace(/-/g, " ");

    return (
      <BreadcrumbItem key={href} className="capitalize text-xs">
        {isLast ? (
          <BreadcrumbPage>{label}</BreadcrumbPage>
        ) : (
          <>
            <BreadcrumbLink asChild>
              <Link href={href}>{label}</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <SidebarInset>
      <header className="bg-background sticky top-0 justify-between flex shrink-0 items-center gap-2 h-12 border-b py-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="text-xs">
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {segments.length > 0 && <BreadcrumbSeparator />}
              {breadcrumbItems}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ThemeToggle />
      </header>
    </SidebarInset>
  );
};

export default AppSidebarInset;
