"use client";
import Logo from "@/components/ui/logo";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "@quibly/ui/components/button";
import { Container } from "@quibly/ui/components/container";
import { Separator } from "@quibly/ui/components/separator";
import { Skeleton } from "@quibly/ui/components/skeleton";
import { cn } from "@quibly/ui/lib/utils";
import { ArrowUpRight, LayoutDashboard, Menu, PlayCircle, X } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../ui/theme-toggle";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Feature", href: "/about" },
  { label: "How it work", href: "/about" },
  { label: "About", href: "/" },
  { label: "FAQ", href: "/contact" },
  { label: "Blog", href: "/contact" },
];

const Header = () => {
  const { status } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  return (
    <>
      <Container
        className={cn(
          "dark:bg-transparent dark:backdrop-blur-xl sm:top-3 duration-300 transition-all fixed h-14 inset-x-0 z-[999] flex py-2 items-center justify-between sm:rounded-xl sm:px-3 border",
          scrolled
            ? "border-border bg-white border sm:w-2/3 sm:shadow-md"
            : "sm:w-full sm:bg-transparent border-transparent"
        )}
      >
        <div className="flex items-center gap-3">
          <Logo />
          <Separator orientation="vertical" className="data-[orientation=vertical]:h-4 hidden sm:block" />
          <nav className="text-xs sm:flex hidden font-medium gap-3 text-neutral-400">
            {navItems.map((item, i) => (
              <Link href={item.href} key={i} className="hover:text-accent-foreground duration-300">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"ghost"} className="hidden sm:flex">
            Watch Demo
            <PlayCircle />
          </Button>
          {status === "loading" ? (
            <Skeleton className="w-28 h-8" />
          ) : status === "authenticated" ? (
            <Link href={DEFAULT_LOGIN_REDIRECT}>
              <Button variant={"secondary"}>
                <LayoutDashboard />
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href={"/login"}>
              <Button variant={"outline"}>
                Login
                <ArrowUpRight />
              </Button>
            </Link>
          )}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Hamburger Icon */}
          <button className="sm:hidden text-muted-foreground" onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Dropdown Menu */}
      <div
        className={cn(
          "fixed top-14 inset-x-0 bg-background z-[998] px-4 py-6 border-b border-border shadow-md transition-all duration-300 overflow-hidden sm:hidden",
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-4 text-sm font-medium">
          {navItems.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className="text-muted-foreground hover:text-accent-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex justify-between gap-4">
          <Button variant="outline">
            Watch Demo <PlayCircle />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default Header;
