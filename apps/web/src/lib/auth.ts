import { TLoginResponse, User } from "@quibly/utils/types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetcher } from "./fetcher";

export const authConfig = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 604800, // 7 days
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize({ email, password }) {
        if (!email || !password) return null;

        const result = await fetcher<TLoginResponse>("/auth/login", {
          method: "POST",
          body: { email, password },
          cache: "no-store",
        });

        if (!result.success) {
          if (result.statusCode === 406) {
            const error = new Error(result.message);
            error.name = "EMAIL_NOT_VERIFIED"; // e.g., "EMAIL_NOT_VERIFIED"
            throw error;
          }
          throw Error(result.message);
        }

        if (!result.success || !result.data) return null;

        const { session, refreshToken } = result.data;

        return {
          id: session.userId,
          sessionToken: session.token,
          refreshToken: refreshToken.token,
          sessionExpiresAt: new Date(session.expiresAt).getTime(),
          refreshExpiresAt: new Date(refreshToken.expiresAt).getTime(),
        };
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          sessionToken: user.sessionToken,
          refreshToken: user.refreshToken,
          sessionExpiresAt: user.sessionExpiresAt,
          refreshExpiresAt: user.refreshExpiresAt,
          userId: user.id,
        };
      }

      if (Date.now() > token.sessionExpiresAt) {
        if (Date.now() > token.refreshExpiresAt) throw new Error("Refresh token expired");

        const response = await fetcher<TLoginResponse>("/auth/refresh-session", {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${token.refreshToken}`,
          },
        });

        if (!response.success || !response.data) throw new Error("Failed to refresh session");

        const { session, refreshToken } = response.data;

        return {
          ...token,
          sessionToken: session.token,
          refreshToken: refreshToken.token,
          sessionExpiresAt: new Date(session.expiresAt).getTime(),
          refreshExpiresAt: new Date(refreshToken.expiresAt).getTime(),
        };
      }

      return token;
    },
    async session({ session, token }) {
      const result = await fetcher<{ user: User }>("/auth/me", {
        headers: {
          Cookie: `session_token=${token.sessionToken}`,
        },
        next: {
          revalidate: 300,
          tags: ["auth"],
        },
      });

      if (!result.success || !result.data) throw new Error("Failed to fetch user data");

      return {
        ...session,
        user: result.data.user,
        sessionToken: token.sessionToken,
        expires: new Date(token.sessionExpiresAt).toISOString(),
      };
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const auth = authConfig.auth;
export const handlers = authConfig.handlers;
export const signIn: typeof authConfig.signIn = authConfig.signIn;
export const signOut: typeof authConfig.signOut = authConfig.signOut;
