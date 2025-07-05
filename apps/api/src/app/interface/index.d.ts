import { User } from "@quibly/database/client";

declare global {
  namespace Express {
    interface Request {
      user: Partial<User>;
      file: Express.Multer.File;
      files?: Express.Multer.File;
      originRole: string;
    }
  }
}
