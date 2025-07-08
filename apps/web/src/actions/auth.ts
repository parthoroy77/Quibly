"use server";

import { signIn } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";
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
