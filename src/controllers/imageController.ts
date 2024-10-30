// Import Request and Response from express module
import { Request, Response } from "express";

// Import multer module
import multer from "multer";

// Import path module
import path from "path";

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload Image Function
export const uploadImage = (req: Request, res: Response) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res
      .status(200)
      .json({ message: "Image uploaded successfully", file: req.file });
  });
};
