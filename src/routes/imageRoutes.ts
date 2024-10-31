// Import all methods inside imageControllers module
import * as imageController from "../controllers/imageController";

// Import all methods inside middlewares module
import * as middlewares from "../utils/middlewares";

// Import all methods inside imageModel module
import * as imageModel from "../models/imageModel";

import express, { Router } from "express";

const router = Router();

// Route for image upload
router.post(
  "/upload",
  imageModel.upload.single("image"),
  imageController.uploadImage
);

// Route for image resize
router.patch(
  "/resize/:imageName",
  middlewares.validateImageName,
  middlewares.imageExists,
  express.json(),
  middlewares.imageResolutionExists,
  middlewares.validateImageResolution,
  imageController.resizeImage
);

// Route for image cropp
router.put(
  "/cropp/:imageName",
  middlewares.validateImageName,
  middlewares.imageExists,
  express.json(),
  middlewares.imageResolutionExists,
  middlewares.validateImageResolution,
  imageController.croppImage
);

// Route for image download
router.get(
  "/download/:imageName",
  middlewares.validateImageName,
  middlewares.imageExists,
  middlewares.alreadyDownloaded,
  imageController.downloadImage
);

export default router;
