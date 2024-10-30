// Import Request and Response from express module
import { Request, Response, NextFunction } from "express";

// Import file system module
import fs from "fs";

// Import path system module
import path from "path";

// Handle invalid route
export const invalidRoute = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Not Found",
    message: "Sorry, that route does not exist",
  });
};

// Handle invalid JSON
export const isImageExist = (imageName: string): boolean =>
  fs.existsSync(path.join(__dirname, "../", imageName));
