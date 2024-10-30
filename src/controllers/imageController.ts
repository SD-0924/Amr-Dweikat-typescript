// Import Request and Response from express module
import { Request, Response } from "express";

// Import all methods inside imageModel module
import * as imageModel from "../models/imageModel";

// Upload Image Function
export const uploadImage = (req: Request, res: Response) => {
  imageModel.uploadImage(req, res);
};

// Upload Image Function
export const resizeImage = (req: Request, res: Response) => {
  imageModel.uploadImage(req, res);
};
