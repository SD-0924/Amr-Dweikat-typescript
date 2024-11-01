// Import express module
import express from "express";

// Import path module
import path from "path";

// Import all error handler methods from errorHandler module
import { invalidRoute, invalidJSON } from "./utils/errorHandler";

// Import all mesthods inside imageRoutes module
import imageRoutes from "./routes/imageRoutes";

// Initialize an Express application
const app = express();

// Server hostname and port
const HOSTNAME = "localhost";
const PORT = 3000;

// Middleware to make images folder as static folder
app.use(express.static(path.join(__dirname, "images")));

// POST route to store image inside images folder
app.use("/images", imageRoutes);

// Middleware to handle invalid routes
app.use(invalidRoute);

// Middleware to handle invalid JSON structure
app.use(invalidJSON);

// Start the server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
