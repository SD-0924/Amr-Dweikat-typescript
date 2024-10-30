// Import Request , Response and NextFunction from express module
import { Request, Response, NextFunction } from "express";

// Middleware to check if reuest body contains image property or not
export const containsImageProperty = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.body.hasOwnProperty("image")) {
    return res.status(400).json({
      message: "Error",
      details:
        "Your body request should be as form-data format and contains image property",
    });
  }
  next();
};

// Middleware to check if file that uploaded is image or not
export const isValidImage = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const regex = /^[a-zA-Z0-9-_]+(\.[a-zA-Z]{3,4})$/;
  if (!req.body.image || !regex.test(req.body.image)) {
    return res.status(400).json({
      message: "Error",
      details: "You should enter image instead of normal file",
    });
  }
  next();
};
