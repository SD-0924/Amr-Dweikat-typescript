// Import Request and Response from express module
import { Request, Response } from "express";

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

// Upload Image Function
export const resizeImage = async (req: Request, res: Response) => {
  // await imageModel.resizeImage(req.params.imageName);
  res.status(200).json({ message: "Image resized successfully" });
};
