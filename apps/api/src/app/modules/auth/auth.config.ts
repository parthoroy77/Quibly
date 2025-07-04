import db from "@quibly/database";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import config from "../../config";

export const authConfig = betterAuth({
  // configs
  appName: "Quibly",
  advanced: {
    cookiePrefix: "quibly",
  },
  baseURL: config.api_domain_url,
  basePath: "/api/v1/auth",

  // Database
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  // providers
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: config.google_client_id,
      clientSecret: config.google_client_secret,
    },
  },

  // Model config
  user: {
    modelName: "User",
    fields: { name: "fullName" },
  },
  session: {
    modelName: "Session",
    expiresIn: 7 * 24 * 60 * 60, // 7 Days
    updateAge: 4 * 60 * 60, // 4 hour
  },
  account: {
    modelName: "Account",
  },
});
