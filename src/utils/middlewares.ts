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
  //   if (!isValidImage(req.params.imageName)) {
  //     return false;
  //   }
  return true;
};
