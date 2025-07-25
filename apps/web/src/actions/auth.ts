"use server";

import { signIn, signOut } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";
import { serverFetcher } from "@/lib/server-fetcher";
import { UserRole } from "@quibly/utils/types";
import { LoginFormData, RegistrationFormData } from "@quibly/utils/validations";
import { AuthError } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const userRegistration = async (data: RegistrationFormData) => {
  const response = await fetcher("/auth/registration", { method: "POST", cache: "no-store", body: data });
  return response;
};

export const userLogin = async (data: LoginFormData) => {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      // TODO: Add default login redirect
      redirect: false,
    });
    return {
      success: true,
      message: "User logged in successfully!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error["cause"]?.err?.name === "EMAIL_NOT_VERIFIED") redirect("/verification-request");
      return {
        success: false,
        message: "Invalid credentials!",
      };
    }
    return {
      success: false,
      message: "Failed to login",
    };
  }
};

export const revalidateOnServer = async (tag: string) => {
  revalidateTag(tag);
};

export const completeOnboarding = async (role: Omit<UserRole, "admin">) => {
  const body = { role };
  const response = await serverFetcher("/auth/onboarding", { method: "POST", body });
  if (response.success) {
    revalidateTag("auth");
  }
  return response;
};

export const resendVerificationEmail = async (email: string) => {
  return await fetcher("/auth/resend-verification", { method: "POST", body: { email } });
};

export const userAccountVerify = async (token: string) => {
  return await fetcher("/auth/verify-account", { method: "POST", body: { token } });
};

export const userLogout = async () => {
  await signOut({
    redirectTo: "/",
    redirect: true,
  });
};
