// Import Request and Response from express module
import { Request, Response, NextFunction } from "express";

// Handle invalid route
export const invalidRoute = (req: Request, res: Response): void => {
  res.status(404).json({
    message: "Invalid route",
    details:
      "Please use one of the available routes: /, /create, or /files/filename",
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
    res.status(400).json({ error: "Invalid JSON format" });
  }
};
