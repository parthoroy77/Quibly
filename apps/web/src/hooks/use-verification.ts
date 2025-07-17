import { fetcher } from "@/lib/fetcher";
import { toast } from "@quibly/ui/components/sonner";
import { useEffect, useState } from "react";

export const useVerification = (token: string) => {
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "verified" | "error" | null>("loading");

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setVerificationStatus("error");
        return;
      }

      setVerificationStatus("loading");
      const response = await fetcher("/auth/verify-account", {
        method: "POST",
        body: { token },
        cache: "no-cache",
      });

      if (response.success) {
        toast.success(response.message);
        setVerificationStatus("verified");
      } else {
        toast.error(response.message);
        setVerificationStatus("error");
      }
    };

    verifyUser();
  }, [token]);

  return verificationStatus;
};
