// Import Request and Response from express module
import { Request, Response, NextFunction } from "express";

// Handle invalid route
export const invalidRoute = (req: Request, res: Response): void => {
  res.status(404).json({
    error: "Not Found",
    message: "Sorry, that route does not exist.",
  });
};

// Handle invalid JSON
export const invalidJson = (
  err: SyntaxError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ message: "Error", details: "Invalid JSON format" });
  }
};
