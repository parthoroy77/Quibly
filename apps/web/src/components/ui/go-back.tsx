"use client";
import { Button } from "@quibly/ui/components/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBack = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      title="Go Back"
      variant={"secondary"}
      size={"icon"}
      className="p-1.5 size-fit"
    >
      <ChevronLeft />
    </Button>
  );
};

export default GoBack;
