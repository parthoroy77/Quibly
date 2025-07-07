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
import ThemeToggle from "../ui/theme-toggle";

const AppSidebarInset = () => {
  return (
    <SidebarInset>
      <header className="bg-background sticky top-0 justify-between flex shrink-0 items-center gap-2 h-12 border-b py-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Inbox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ThemeToggle />
      </header>
    </SidebarInset>
  );
};

export default AppSidebarInset;
