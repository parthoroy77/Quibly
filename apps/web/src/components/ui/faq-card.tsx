"use client";

import { cn } from "@quibly/ui/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function FAQCard({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "hover:bg-background bg-background cursor-pointer rounded-xl border p-5 transition-all duration-300",
        isOpen && "bg-background"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between text-left font-medium"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 transition-transform duration-300" />
        ) : (
          <ChevronDown className="h-5 w-5 transition-transform duration-300" />
        )}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pt-2 text-xs md:pr-12 md:text-sm">{children}</div>
      </div>
    </div>
  );
}
