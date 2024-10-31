// Import file system module
import fs from "fs";

// Import path system module
import path from "path";

// Import Request , Response and NextFunction from express module
import { Request, Response, NextFunction } from "express";

// Function to check if valid image or not by checking the extension
export const isValidImage = (fileName: string): boolean => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(fileName).toLowerCase());

  if (!extname) {
    return false;
  }

  return true;
};

// Function to check if image exist alreay or not
export const isImageExist = (imageName: string): boolean => {
  const images = fs.readdirSync(path.join(__dirname, `../images`));
  if (images.indexOf(imageName) === -1) {
    return false;
  }
  return true;
};

// Middlware to check if image name in URL correct or not
export const validateImageName = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.params.imageName || !isValidImage(req.params.imageName)) {
    return res.status(400).json({
      error: "Invalid URL request",
      message: "The provided image name in URL is invalid",
    });
  }
  next();
};

// Middlware to check if user uploaed image or not
export const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.file) {
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
  next();
};

// Middlware to check image exist or not
export const imageExists = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!isImageExist(req.params.imageName)) {
    return res.status(404).json({
      error: "Image not found",
      message:
        "The provided image that you want to work on does not exist in our system",
    });
  }
  next();
};

// Middlware to check new resolution image provided or not
export const imageResolutionExists = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (req.method === "PATCH") {
    if (
      !req.body ||
      !req.body.hasOwnProperty("width") ||
      !req.body.hasOwnProperty("height")
    ) {
      return res.status(400).json({
        error: "Invalid body request",
        message:
          "You need to provide valid JSON structue that contains the 'width' and 'height' properties",
      });
    }
  } else {
    if (
      !req.body ||
      !req.body.hasOwnProperty("width") ||
      !req.body.hasOwnProperty("height") ||
      !req.body.hasOwnProperty("x") ||
      !req.body.hasOwnProperty("y")
    ) {
      return res.status(400).json({
        error: "Invalid body request",
        message:
          "You need to provide valid JSON structue that contains the 'width' , 'height' , 'x' and 'y' properties",
      });
    }
  }

  next();
};

// Middlware to check image resolution
export const validateImageResolution = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const width = req.body.width;
  if (typeof width !== "number" || width <= 0 || !Number.isInteger(width))
    return res.status(400).json({
      error: "Invalid width value",
      message: "The width value should be positive integer number",
    });

  const height = req.body.height;
  if (typeof height !== "number" || height <= 0 || !Number.isInteger(height))
    return res.status(400).json({
      error: "Invalid height value",
      message: "The height value should be positive integer number",
    });

  if (req.method !== "PATCH") {
    const x = req.body.x;
    if (typeof x !== "number" || x < 0 || !Number.isInteger(x))
      return res.status(400).json({
        error: "Invalid x value",
        message: "The x value can be either 0 or positive integer number",
      });

    const y = req.body.y;
    if (typeof y !== "number" || y < 0 || !Number.isInteger(y))
      return res.status(400).json({
        error: "Invalid y value",
        message: "The y value can be either 0 or  positive integer number",
      });
  }

  next();
};

// Middlware to check image already downloaded or not
export const alreadyDownloaded = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (
    fs.existsSync(
      path.join("C:", "Users", "pc", "Downloads", req.params.imageName)
    )
  ) {
    return res.status(400).json({
      error: "Image already downloaded",
      message: "The provided image that you want to download already download",
    });
  }
  next();
};

// Middlware to check type property provided or not
export const typePropertyExists = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.body || !req.body.hasOwnProperty("type")) {
    return res.status(400).json({
      error: "Invalid body request",
      message:
        "You need to provide valid JSON structue that contains the 'type' property",
    });
  }

  next();
};

// Middlware to check the value of type property
export const validateTypeProperty = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (
    typeof req.body.type !== "string" ||
    (req.body.type !== "greyscale" && req.body.type !== "blur")
  ) {
    return res.status(400).json({
      error: "Invalid body request",
      message:
        "The value of the 'type' property should be in string format and must be one of the following values: greyscale or blur",
    });
  }
  if (req.body.type === "blur") {
    if (!req.body.hasOwnProperty("value")) {
      return res.status(400).json({
        error: "Invalid body request",
        message: "You need to provide the 'value' property to blur the image",
      });
    }
    if (
      typeof req.body.value !== "number" ||
      req.body.value <= 0 ||
      req.body.value > 100
    ) {
      return res.status(400).json({
        error: "Invalid body request",
        message:
          "The value of the 'value' property should be greater than 0 and less than or equal to 100",
      });
    }
  }

  next();
};

// Middlware to check x and y properties provided or not
export const xAndYProperitiesExists = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (
    !req.body ||
    !req.body.keyValuePairs ||
    !req.body.keyValuePairs.hasOwnProperty("x") ||
    !req.body.keyValuePairs.hasOwnProperty("y")
  ) {
    return res.status(400).json({
      error: "Invalid body request",
      message:
        "You need to provide 'x' and 'y' properties beside 'image' property",
    });
  }
  next();
};

// Middlware to check x and y properties valid or not
export const validatexAndYProperities = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const x = req.body.keyValuePairs.x;
  if (typeof x !== "number" || x < 0 || !Number.isInteger(x)) {
    return res.status(400).json({
      error: "Invalid body request",
      message: "The x value can be either 0 or positive integer number",
    });
  }

  const y = req.body.keyValuePairs.y;
  if (typeof y !== "number" || y < 0 || !Number.isInteger(y)) {
    return res.status(400).json({
      error: "Invalid body request",
      message: "The y value can be either 0 or positive integer number",
    });
  }

  next();
};
