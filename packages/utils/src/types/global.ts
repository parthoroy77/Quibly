import { RefreshToken, Session } from "@quibly/database/client";

export interface ExtendedFile extends File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export type TLabelValuePair = {
  label: string;
  value: string;
};

export type TPaginationState = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TLoginResponse = {
  session: Session;
  refreshToken: RefreshToken;
};
