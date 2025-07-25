import { cn } from "@quibly/ui/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" className={cn("bg-secondary animate-pulse rounded-md", className)} {...props} />;
}

export { Skeleton };
