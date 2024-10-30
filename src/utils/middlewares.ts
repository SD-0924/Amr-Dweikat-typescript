// Import file system module
import fs from "fs";

// Import path system module
import path from "path";

// Import Request , Response and NextFunction from express module
import { Request, Response, NextFunction } from "express";

// Function to check if valid image or not by checking the extension
export const isValidImage = (fileName: string): boolean => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(fileName).toLowerCase());

  if (!extname) {
    return false;
  }

  return true;
};

// Function to check if image exist alreay or not
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

// Middlware to check new resolution image provided or not
export const imageResolutionExists = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (
    !req.body ||
    !req.body.hasOwnProperty("width") ||
    !req.body.hasOwnProperty("height")
  ) {
    return res.status(400).json({
      error: "Invalid body request",
      message:
        "You need to provide valid JSON structue that contains the 'width' and 'height' properties",
    });
  }
  next();
};

// Middlware to check image resolution
export const validateImageResolution = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const width = req.body.width;
  if (!width || typeof width !== "number" || width < 0)
    return res.status(400).json({
      error: "Invalid width value",
      message: "The width value should be positive number",
    });

  const height = req.body.height;
  if (!height || typeof height !== "number" || height < 0)
    return res.status(400).json({
      error: "Invalid height value",
      message: "The height value should be positive number",
    });

  next();
};
