"use client";
import { useVerification } from "@/hooks/use-verification";
import { Button } from "@quibly/ui/components/button";
import { BadgeCheck, Loader, OctagonAlert } from "lucide-react";
import Link from "next/link";

const VerifyView = ({ token }: { token: string }) => {
  const verificationStatus = useVerification(token);

  const renderContent = () => {
    switch (verificationStatus) {
      case "loading":
        return <LoadingState />;
      case "verified":
        return <VerifiedState />;
      case "error":
        return <ErrorState />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full h-full p-5 flex flex-col justify-center items-center *:border *:rounded-2xl *:bg-background">
      {renderContent()}
    </section>
  );
};

const LoadingState = () => (
  <div className="mx-auto flex h-[320px] flex-col items-center justify-center gap-3 p-5 lg:w-[40%]">
    <Loader size={26} className="animate-spin" />
    <span>Verifying Your Account</span>
  </div>
);

const VerifiedState = () => (
  <div className="mx-auto flex h-[320px] flex-col items-center justify-center gap-3 p-5 lg:w-[40%]">
    <BadgeCheck className=" size-[100px] rounded-full border p-4 bg-secondary" />
    <h3 className="text-xl font-medium">Your Account Now Verified!!</h3>
    <span className="text-accent-foreground text-sm">Now you can fully access our platform</span>
    <Link href={"/login"}>
      <Button variant={"outline"} size={"sm"} className="px-6">
        Go To Login
      </Button>
    </Link>
  </div>
);

const ErrorState = () => (
  <div className="mx-auto flex h-[320px] flex-col items-center justify-center gap-3 p-5 lg:w-[40%]">
    <OctagonAlert className="size-[70px] rounded-full border bg-red-600 p-2 text-white lg:size-[100px] lg:p-4" />
    <h3 className="text-xl font-medium">Could not able to Verify Your Account!</h3>
  </div>
);

export default VerifyView;
