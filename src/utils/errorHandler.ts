// Import Request and Response from express module
import { Request, Response } from "express";

// Handle invalid route
export const invalidRoute = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Not Found",
    message: "Sorry, that route does not exist",
  });
};
