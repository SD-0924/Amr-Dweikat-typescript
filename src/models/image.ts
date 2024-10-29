// Import Request , Response and NextFunction from express module
import { Request, Response, NextFunction } from "express";

// Import multer module to deal with files that uploaded
import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Initialize multer
const upload = multer({ storage });

// Middle ware to check if file that uploaded is image or not
export const isImage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(typeof req.body);
  console.log(req.body);
  res.send("ok");
};
