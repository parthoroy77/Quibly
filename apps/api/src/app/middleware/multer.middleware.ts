import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_VIDEO_EXTENSIONS,
  MAX_FILE_PER_UPLOAD,
  MAX_IMAGE_SIZE,
} from "@quibly/utils/constants";
import { generateUniqueId } from "@quibly/utils/functions";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import multer, { diskStorage, FileFilterCallback } from "multer";
import path from "path";
import { ApiError } from "../handlers/ApiError";

// Define storage settings
const storage = diskStorage({
  destination: (_req: Request, file: Express.Multer.File, cb) => {
    // Example: save images to public/images directory and videos to public/videos directory
    let destination = "public/images";
    if (file.mimetype.startsWith("video/")) {
      destination = "public/videos";
    }
    cb(null, destination);
  },
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    // Example: prepend current timestamp to filename to make it unique
    const timestamp = Date.now();
    const uniquerId = generateUniqueId("IMG");
    cb(null, `${uniquerId}-${timestamp}-${file.originalname}`);
  },
});

// Define file filter
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension) && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else if (ALLOWED_VIDEO_EXTENSIONS.includes(file.mimetype) && file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new ApiError(StatusCodes.NOT_ACCEPTABLE, "File format is not supported"));
  }
};

// Create Multer instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_IMAGE_SIZE,
    files: MAX_FILE_PER_UPLOAD,
  },
});
