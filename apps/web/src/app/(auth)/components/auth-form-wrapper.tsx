import Logo from "@/components/ui/logo";
import { Separator } from "@quibly/ui/components/separator";
import { ReactNode } from "react";
import SocialLogin from "./social-login";

const AuthFormWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="h-screen flex flex-col justify-center items-center relative">
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
