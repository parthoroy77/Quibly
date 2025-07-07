"use client";
import { Button } from "@quibly/ui/components/button";
import { AlignLeft, LayoutGrid } from "lucide-react";
import { useState } from "react";

const ViewToggle = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex border items-center gap-1 p-1 bg-secondary rounded-lg transition-all duration-300">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setViewMode("grid")}
        className={`h-7 px-2 transition-all duration-300 ease-in-out transform rounded-md ${
          viewMode === "grid" ? "bg-primary text-white dark:text-foreground scale-105 shadow-md" : "hover:bg-accent"
        }`}
      >
        <LayoutGrid size={14} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setViewMode("list")}
        className={`h-7 px-2 transition-all duration-300 ease-in-out transform rounded-md ${
          viewMode === "list" ? "bg-primary text-white dark:text-foreground scale-105 shadow-md" : "hover:bg-accent"
        }`}
      >
        <AlignLeft size={14} />
      </Button>
    </div>
  );
};

export default ViewToggle;
