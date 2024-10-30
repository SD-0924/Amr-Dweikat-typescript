// Import file system module
import fs from "fs";

// Import path system module
import path from "path";

// Import Request , Response and NextFunction from express module
import { Request, Response, NextFunction } from "express";

// Check if valid image or not by checking the extension
export const isValidImage = (fileName: string): boolean => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(fileName).toLowerCase());

  if (!extname) {
    return false;
  }

  return true;
};

// Check if image exist alreay or not
export const isImageExist = (imageName: string): boolean => {
  const images = fs.readdirSync(path.join(__dirname, `../images`));
  if (images.indexOf(imageName) === -1) {
    return false;
  }
  return true;
};

// Middlware to check if image name in URL correct or not
export const validateImageName = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.params.imageName || !isValidImage(req.params.imageName)) {
    return res.status(400).json({
      error: "Invalid URL request",
      message: "The provided image name in URL is invalid",
    });
  }
  next();
};

// Middlware to check image exist or not
export const imageExists = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!isImageExist(req.params.imageName)) {
    return res.status(404).json({
      error: "Image not found",
      message:
        "The provided image that you want to work on does not exist in our system",
    });
  }
  next();
};