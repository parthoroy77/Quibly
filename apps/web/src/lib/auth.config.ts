import { NextAuthConfig } from "next-auth";

export default {
  session: {
    strategy: "jwt",
    maxAge: 604800, // 7 days
  },
  pages: {
    signIn: "/login",
  },
  providers: [],
} satisfies NextAuthConfig;
