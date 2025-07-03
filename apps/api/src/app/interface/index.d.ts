import { User } from "@quibly/prisma/client";

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
