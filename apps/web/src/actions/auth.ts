"use server";

import { signIn } from "@/lib/auth";
import { LoginFormData } from "@quibly/utils/validations";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

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
    console.log(error);
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
