import Logo from "@/components/ui/logo";
import { Button } from "@quibly/ui/components/button";
import { Container } from "@quibly/ui/components/container";
import { Separator } from "@quibly/ui/components/separator";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import Link from "next/link";

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
  return (
    <Container className="sticky bg-white top-3 flex py-2 items-center justify-between rounded-xl border px-2">
      <div className="flex items-center gap-3">
        <Logo />
        <Separator orientation="vertical" className=" data-[orientation=vertical]:h-4" />
        <nav className="text-xs font-medium gap-3 flex text-neutral-400">
          {navItems.map((item, i) => (
            <Link href={"/"} key={i}>
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
      </div>
    </Container>
  );
};

export default Header;
