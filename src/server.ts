// Import express module
import express from "express";

// Import all error handler methods from errorHandler module
import { invalidRoute, invalidJson } from "./utils/errorHandler";

// Initialize an Express application
const app = express();

// Server hostname and port
const HOSTNAME = "localhost";
const PORT = 3000;

// Middleware to handle invalid routes
app.use(invalidRoute);

// Middleware to handle invalid JSON
app.use(invalidJson);

// Make the server start listening
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
