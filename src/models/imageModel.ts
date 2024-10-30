// Import Request and Response from express module
import { Request, Response } from "express";

// Import multer module
import multer from "multer";

// Import sharp module
import sharp from "sharp";

// Import path module
import path from "path";

// Import file system module
import fs from "fs";

// Import isImageExist method to chek if image already exist or not
import { isImageExist, isValidImage } from "../utils/middlewares";

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

// Declare new property inside request parameter
declare global {
  namespace Express {
    interface Request {
      fileFilterMessage?: string;
    }
  }
}

// File filter to validate file type
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!isValidImage(file.originalname)) {
    req.fileFilterMessage = "You should upload image";
    return cb(null, false);
  }

  if (isImageExist(file.originalname)) {
    req.fileFilterMessage = "The image that you tried to upload already exists";
    return cb(null, false);
  }

  cb(null, true);
};

export const upload = multer({ storage, fileFilter });

// Cropp Image Function
export const croppImage = async (
  imageName: string,
  width: number,
  height: number,
  x: number,
  y: number
): Promise<any> => {
  const imageBuffer = fs.readFileSync(
    path.join(__dirname, "..", "images", imageName)
  );
  const croppedImage = await sharp(imageBuffer)
    .extract({
      left: Math.floor(x),
      top: Math.floor(y),
      width: Math.floor(width),
      height: Math.floor(height),
    })
    .toBuffer();
  fs.writeFileSync(
    path.join(__dirname, "..", "images", imageName),
    croppedImage
  );
};
