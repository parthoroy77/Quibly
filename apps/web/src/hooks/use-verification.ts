"use client";
import { userAccountVerify } from "@/actions/auth";
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
      const response = await userAccountVerify(token);
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
