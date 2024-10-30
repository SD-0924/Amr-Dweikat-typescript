// Import all methods inside imageControllers module
import * as itemController from "../controllers/imageController";

// Import all methods inside imageControllers module
import * as middlewares from "../utils/middlewares";

import { Router } from "express";

const router = Router();

// Route for image upload
router.post("/upload", itemController.uploadImage);

export default router;
