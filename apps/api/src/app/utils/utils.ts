import { Request } from "express";
import fs from "fs";

export function getFilePath(req: Request, fieldName: string): string | undefined {
  // Check if req.files is an object with field names
  if (req.files) {
    return (req.files as unknown as Record<string, Express.Multer.File[]>)[fieldName]?.[0]?.path;
  }

  // Check if req.file is used (single file upload)
  if (req.file && req.file.fieldname === fieldName) {
    return req.file.path;
  }

  // Return undefined if no file or path is found
  return undefined;
}

export function unlinkFilePath(path: string) {
  fs.unlinkSync(path);
}
