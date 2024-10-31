// Import Request and Response from express module
import { Request, Response } from "express";

// Import all methods from imageModel module
import * as imageModel from "../models/imageModel";

// Import path module
import path from "path";

// Upload Image Function
export const uploadImage = (req: Request, res: Response): any => {
  if (!req.file) {
    if (req.fileFilterMessage) {
      return res.status(400).json({
        error: "Invalid body request",
        message: req.fileFilterMessage,
      });
    }
    return res.status(400).json({
      error: "Invalid body request",
      message: "You should provide image file",
    });
  }
  res.status(201).json({ message: "Image uploaded successfully" });
};

// Resize Image Function
export const resizeImage = async (req: Request, res: Response) => {
  await imageModel.croppImage(
    req.params.imageName,
    req.body.width,
    req.body.height,
    req.body.x,
    req.body.y
  );
  res.status(200).json({ message: "Image resized successfully" });
};

// Cropp Image Function
export const croppImage = async (req: Request, res: Response) => {
  await imageModel.croppImage(
    req.params.imageName,
    req.body.width,
    req.body.height,
    req.body.x,
    req.body.y
  );
  res.status(200).json({ message: "Image cropped successfully" });
};

// Download Image Function
export const downloadImage = (req: Request, res: Response) => {
  imageModel.downloadImage(req.params.imageName);
  res.status(200).json({
    message: `Image downloaded successfully and you can find it at this path: ${path.join(
      "C:",
      "Users",
      "pc",
      "Downloads"
    )}`,
  });
};
