"use client";
import { completeOnboarding } from "@/actions/auth";
import { AuroraText } from "@/components/shared/aurora-text";
import Logo from "@/components/ui/logo";
import { Button } from "@quibly/ui/components/button";
import { toast } from "@quibly/ui/components/sonner";
import { cn } from "@quibly/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const OnboardingPage = () => {
  const [role, setRole] = useState<"educator" | "student" | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleOnboarding = async () => {
    if (!role) {
      toast.info("Please select one of role");
      return;
    }
    startTransition(async () => {
      const toastId = toast.loading("Processing your request", { duration: 2000 });
      const response = await completeOnboarding(role);
      console.log(response);
      if (response.success) {
        toast.success(response.message, { id: toastId });
        router.push("/");
      } else {
        toast.error(response.message, { id: toastId });
      }
    });
  };
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200/20 dark:bg-pink-500/5 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 pattern-light dark:pattern-dark"></div>
      </div>
      <div className="p-4 flex flex-col justify-center items-center md:max-w-3xl w-full space-y-7">
        <Logo />
        <h1 className="font-instrumental-serif font-semibold tracking-wider">Complete your onboarding.</h1>
        <div className="grid md:grid-cols-2 gap-5 w-full *:cursor-pointer">
          <div
            onClick={() => setRole("educator")}
            className={cn(
              "flex flex-col justify-center items-center shadow bg-background rounded-4xl p-6 text-center space-y-2 border",
              role === "educator" && "ring ring-primary"
            )}
          >
            <span className="font-semibold font-instrumental-serif tracking-wide text-3xl">
              Join as <AuroraText>Educator</AuroraText>
            </span>
            <p className="text-sm text-muted-foreground">
              Create, manage, and host engaging quizzes with AI-powered tools and comprehensive analytics.
            </p>
          </div>
          <div
            onClick={() => setRole("student")}
            className={cn(
              "flex flex-col justify-center items-center shadow bg-background rounded-4xl p-6 text-center space-y-2 border",
              role === "student" && "ring ring-primary"
            )}
          >
            <span className="font-semibold font-instrumental-serif tracking-wide text-3xl">
              Join as <AuroraText>Student</AuroraText>
            </span>
            <p className="text-sm text-muted-foreground">
              Participate on quizzes instantly, compete with others, and track your learning progress seamlessly.
            </p>
          </div>
        </div>
        <Button onClick={handleOnboarding} disabled={!role || isPending} size={"lg"}>
          Continue your journey
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
