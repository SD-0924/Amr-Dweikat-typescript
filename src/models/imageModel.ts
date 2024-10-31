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

// Setup multer storage
const waterWorkingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
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
    req.fileFilterMessage = "Invalid image file";
    return cb(null, false);
  }

  if (isImageExist(file.originalname)) {
    req.fileFilterMessage = "The image that you tried to upload already exists";
    return cb(null, false);
  }

  cb(null, true);
};

// File filter to validate file type
const waterMakingFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!isValidImage(file.originalname)) {
    req.fileFilterMessage = "Invalid image file";
    return cb(null, false);
  }

  cb(null, true);
};

export const upload = multer({ storage, fileFilter });

export const waterMakingUpload = multer({
  storage: waterWorkingStorage,
  fileFilter: waterMakingFilter,
});

// Resize Image Function
export const resizeImage = async (
  imageName: string,
  width: number,
  height: number
): Promise<any> => {
  try {
    const imageBuffer = fs.readFileSync(
      path.join(__dirname, "..", "images", imageName)
    );
    const resizedImage = await sharp(imageBuffer)
      .resize({
        width: width,
        height: height,
        fit: sharp.fit.inside,
      })
      .toBuffer();
    fs.writeFileSync(
      path.join(__dirname, "..", "images", imageName),
      resizedImage
    );
  } catch (err) {
    console.log(err);
  }
};

/*
Crop works like this:

Y-axis (height)
|
|   (0, 0)
|    +--------------------+
|    |                    |
|    |                    |
|    |                    |   <-- Full Image
|    |                    |
|    |                    |
|    +--------------------+
|    (0, height)
|
+----------------------------------- X-axis (width)
*/
// Cropp Image Function
export const croppImage = async (
  imageName: string,
  width: number,
  height: number,
  x: number,
  y: number
): Promise<any> => {
  try {
    const imageBuffer = fs.readFileSync(
      path.join(__dirname, "..", "images", imageName)
    );
    const croppedImage = await sharp(imageBuffer)
      .extract({
        left: x,
        top: y,
        width: width,
        height: height,
      })
      .toBuffer();
    fs.writeFileSync(
      path.join(__dirname, "..", "images", imageName),
      croppedImage
    );
  } catch (err) {
    console.log(err);
  }
};

// Download Image Function
export const downloadImage = (imageName: string): void => {
  try {
    const src = path.join(__dirname, "..", "images", imageName);
    const des = path.join("C:", "Users", "pc", "Downloads", imageName);
    fs.copyFileSync(src, des);
  } catch (err) {
    console.log(err);
  }
};

// Filter Image Function
export const filterImage = async (
  imageName: string,
  type: string,
  value?: number
): Promise<any> => {
  try {
    const imageBuffer = fs.readFileSync(
      path.join(__dirname, "..", "images", imageName)
    );
    if (type === "greyscale") {
      const filteredImage = await sharp(imageBuffer).greyscale().toBuffer();
      fs.writeFileSync(
        path.join(__dirname, "..", "images", imageName),
        filteredImage
      );
    } else if (type === "blur") {
      const filteredImage = await sharp(imageBuffer).blur(value).toBuffer();
      fs.writeFileSync(
        path.join(__dirname, "..", "images", imageName),
        filteredImage
      );
    }
  } catch (err) {
    console.log(err);
  }
};
