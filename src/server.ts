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
import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Initialize multer
const upload = multer({ storage });

//---------------------------------------------------------------------------------------------------------------------------------
// POST route to store image inside images folder
app.post("/uploadImage", upload.single("image"), middlewares.isImage);

// Middleware to handle invalid routes
app.use(invalidRoute);

// Middleware to handle invalid JSON
app.use(invalidJson);

// Make the server start listening
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
