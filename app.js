require("dotenv").config();

const express = require("express");
const cors = require("cors");

const router = require("./src/routes");
const corsOptions = require("./src/configs/corsOptions");
const initializeModel = require("./src/configs/initializeModel");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
const port = process.env.PORT;

// Basic route for health check
app.get("/", (req, res) => {
  res.send("<h1>API is running!</h1>");
});

// Middleware setup
app.use(cors(corsOptions)); // Enable CORS with specified options
app.use(express.json()); // Parse incoming JSON requests
app.use(router); // Use defined routes
app.use(errorHandler); // Error handling middleware

// Initialize the model (if needed)
initializeModel(app);

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
