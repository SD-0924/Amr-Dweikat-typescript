// Import all methods inside imageControllers module
import * as imageController from "../controllers/imageController";

// Import all methods inside middlewares module
import * as middlewares from "../utils/middlewares";

import express, { Router } from "express";

const router = Router();

// Route for image upload
router.post("/upload", imageController.uploadImage);

// Route for image resize
router.put(
  "/resize/:imageName",
  middlewares.validateImageName,
  middlewares.imageExists,
  express.json(),
  imageController.resizeImage
);

export default router;
