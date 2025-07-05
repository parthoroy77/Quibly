import { UserRole } from "@quibly/database/client";

export type TRegistrationPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
  role: UserRole;
};

export type TLogoutPayload = {
  sessionToken: string;
  userId: string;
};
