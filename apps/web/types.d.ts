import { User as TUser } from "@quibly/utils/types";
import { DefaultUser } from "next-auth";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: TUser;
    sessionToken: string;
  }

  interface User extends Omit<DefaultUser, "id"> {
    sessionToken: string;
    sessionExpiresAt: number;
    refreshToken: string;
    refreshExpiresAt: number;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    sessionToken: string;
    sessionExpiresAt: number;
    refreshToken: string;
    refreshExpiresAt: number;
  }
}
