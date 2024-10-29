// Import Request , Response and NextFunction from express module
import { Request, Response, NextFunction } from "express";

// Middle ware to check if file that uploaded is image or not
export const isImage = (req: Request, res: Response): any => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
};
