// Import express module
import express from "express";

// Initialize an Express application
const app = express();

// Server hostname and port
const HOSTNAME = "localhost";
const PORT = 3000;

// Make the server start listening
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
