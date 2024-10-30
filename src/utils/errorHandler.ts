// Import Request and Response from express module
import { Request, Response, NextFunction } from "express";

// Import file system module
import fs from "fs";

// Import path system module
import path from "path";

// Handle invalid route
export const invalidRoute = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Not Found",
    message: "Sorry, that route does not exist",
  });
};

// Check if valid image or not by checking the extension
export const isValidImage = (
  fileMimeType: string,
  fileName: string
): boolean => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(fileMimeType);
  const extname = filetypes.test(path.extname(fileName).toLowerCase());
  if (!mimetype || !extname) {
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
