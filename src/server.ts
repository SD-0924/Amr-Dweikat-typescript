// Import express module
import express from "express";

// Import path module
import path from "path";

// Import all error handler methods from errorHandler module
import { invalidRoute, invalidJson } from "./utils/errorHandler";

// Import all methods inside imageControllers module
import * as itemController from "./controllers/imageController";

// Import all methods inside imageControllers module
import * as middlewares from "./utils/middlewares";

// Initialize an Express application
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Specify the directory for views
app.set("views", path.join(__dirname, "views"));

// Server hostname and port
const HOSTNAME = "localhost";
const PORT = 3000;

// GET route to render page for uploading image
app.get("/uploadImage", itemController.uploadImage);
//---------------------------------------------------------------------------------------------------------------------------------

import { Request, Response, NextFunction } from "express";
import multer, { diskStorage } from "multer";
// Configure storage for multer
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter for multer
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  }
  cb(new Error("Invalid file type. Only images are allowed.")); // Reject the file
};

// Initialize multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

//---------------------------------------------------------------------------------------------------------------------------------
// POST route to store image inside images folder
app.post(
  "/uploadImage",
  upload.single("image"),
  (req: Request, res: Response): any => {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).send("No file uploaded or invalid file type.");
    }
    res.send(`File uploaded successfully: ${req.file.path}`);
  }
);

// Middleware to handle invalid routes
app.use(invalidRoute);

// Middleware to handle invalid JSON
app.use(invalidJson);

// Make the server start listening
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
