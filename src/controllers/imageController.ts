// Import Request and Response from express module
import { Request, Response } from "express";

// Import all methods inside imageModel module
import * as imageModel from "../models/imageModel";

// Upload Image Function
export const uploadImage = (req: Request, res: Response) => {
  // imageModel.uploadImage(req, res);
  imageModel.upload.single("image")(req, res, (err) => {
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
    res.status(201).json({ message: "Image uploaded successfully" });
  });
};

// Upload Image Function
export const resizeImage = async (req: Request, res: Response) => {
  await imageModel.resizeImage(req.params.imageName);
  res.status(200).json({ message: "Image resized successfully" });
};
