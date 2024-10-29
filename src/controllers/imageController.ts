// Import Request and Response from express module
import { Request, Response, NextFunction } from "express";

// Method to render upload image page
export const uploadImage = (req: Request, res: Response) => {
  res.render("upload");
};
