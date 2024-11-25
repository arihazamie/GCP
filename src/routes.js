const express = require("express");
const multer = require("multer");

const {
  getPredictHistories,
  predict,
} = require("./controllers/predictController");

// Configure multer for file uploads with a size limit and memory storage
const upload = multer({
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 1MB
  storage: multer.memoryStorage(), // Store files in memory
});

// Create a new router instance
const router = express.Router();

// Route to get prediction histories
router.get("/predict/histories", getPredictHistories);

// Route to make a prediction
router.post("/predict", upload.single("image"), predict);

// Export the router
module.exports = router;
