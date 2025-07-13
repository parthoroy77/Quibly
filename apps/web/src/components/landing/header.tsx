"use client";
import Logo from "@/components/ui/logo";
import { Button } from "@quibly/ui/components/button";
import { Container } from "@quibly/ui/components/container";
import { Separator } from "@quibly/ui/components/separator";
import { cn } from "@quibly/ui/lib/utils";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../ui/theme-toggle";

export const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Feature",
    href: "/about",
  },
  {
    label: "How it work",
    href: "/about",
  },
  {
    label: "About",
    href: "/",
  },
  {
    label: "FAQ",
    href: "/contact",
  },
  {
    label: "Blog",
    href: "/contact",
  },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });
  return (
    <Container
      className={cn(
        "dark:bg-transparent dark:backdrop-blur-xl top-3 duration-300 transition-all fixed h-14 inset-x-0 z-[999] flex py-2 items-center justify-between rounded-xl px-2 border",
        scrolled ? "border-border bg-white border w-2/3 shadow-md" : "sm:w-full sm:bg-transparent border-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        <Logo />
        <Separator orientation="vertical" className=" data-[orientation=vertical]:h-4" />
        <nav className="text-xs font-medium gap-3 flex text-neutral-400 ">
          {navItems.map((item, i) => (
            <Link href={"/"} key={i} className="hover:text-accent-foreground duration-300">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <Button variant={"ghost"}>
          Watch Demo
          <PlayCircle />
        </Button>
        <Button variant={"outline"}>
          Login
          <ArrowUpRight />
        </Button>
        <ThemeToggle />
      </div>
    </Container>
  );
};

export default Header;
