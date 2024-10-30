// Import all methods inside imageControllers module
import * as imageController from "../controllers/imageController";

import express, { Router } from "express";

const router = Router();

// Route for image upload
router.post("/upload", imageController.uploadImage);

// Route for image resize
router.put("/resize/:imageName", imageController.resizeImage);

export default router;
