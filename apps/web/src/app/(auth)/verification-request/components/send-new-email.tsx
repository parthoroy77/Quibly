"use client";
import { resendVerificationEmail } from "@/actions/auth";
import { Button } from "@quibly/ui/components/button";
import { toast } from "@quibly/ui/components/sonner";
import { Loader } from "lucide-react";
import { useTransition } from "react";

const SendNewEmail = ({ email }: { email: string }) => {
  const [isPending, startTransition] = useTransition();
  const handleRequestNewEmail = async () => {
    startTransition(async () => {
      const result = await resendVerificationEmail(email);
      if (result.success) {
        toast.success(result.message);
      } else if (result.error) {
        toast.error(result.message);
      }
    });
  };
  return (
    <div>
      <Button onClick={handleRequestNewEmail} disabled={isPending} variant={"outline"} size={"sm"} className="px-6">
        {isPending && <Loader size={16} className="animate-spin" />}
        Request a new verification email
      </Button>
    </div>
  );
};

export default SendNewEmail;
