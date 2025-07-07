import Logo from "@/components/ui/logo";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Separator } from "@quibly/ui/components/separator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import SocialLogin from "./social-login";

const AuthFormWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="h-screen flex flex-col justify-center items-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200/20 dark:bg-pink-500/5 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 pattern-light dark:pattern-dark"></div>
      </div>
      <div className="absolute top-3 w-full px-5 flex justify-between">
        <Link href={"/"} className="flex text-sm font-medium items-center gap-2">
          <ChevronLeft size={16} />
          <span>Home</span>
        </Link>
        <ThemeToggle />
      </div>

      <Logo />
      <div className="p-4 md:max-w-md w-full space-y-4">
        {children}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs  ">
            <span className="px-2 text-muted-foreground backdrop-blur-2xl">Or continue with</span>
          </div>
        </div>
        <SocialLogin />
      </div>
    </section>
  );
};

export default AuthFormWrapper;
