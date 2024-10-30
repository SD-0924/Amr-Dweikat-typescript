// Import all methods inside imageControllers module
import * as imageController from "../controllers/imageController";

import { Router } from "express";

const router = Router();

// Route for image upload
router.post("/upload", imageController.uploadImage);

export default router;
