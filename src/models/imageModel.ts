// Import Request and Response from express module
import { Request, Response } from "express";

// Import multer module
import multer from "multer";

// Import path module
import path from "path";

// Import isImageExist method to chek if image already exist or not
import { isImageExist, isValidImage } from "../utils/errorHandler";

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
  if (!isValidImage(file.mimetype, file.originalname)) {
    req.fileFilterMessage = "You should upload image";
    return cb(null, false);
  }

  if (isImageExist(file.originalname)) {
    req.fileFilterMessage = "The image that you tried to upload already exists";
    return cb(null, false);
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

// Upload Image Function
export const uploadImage = (req: Request, res: Response) => {
  upload.single("image")(req, res, (err) => {
    if (err || !req.file) {
      if (req.fileFilterMessage) {
        return res.status(400).json({
          error: "Invalid body request",
          message: req.fileFilterMessage,
        });
      }
      return res.status(400).json({
        error: "Invalid body request",
        message:
          "The body request should be in form-data format also should contain 'image' as key and only one image file as value",
      });
    }
    res.status(200).json({ message: "Image uploaded successfully" });
  });
};
