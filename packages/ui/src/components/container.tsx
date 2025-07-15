import { cn } from "@quibly/ui/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

export const Container = ({ children, className }: { children: ReactNode; className?: ClassValue }) => {
  return <div className={cn("mx-auto h-full w-full max-w-7xl px-4 sm:px-0", className)}>{children}</div>;
};
