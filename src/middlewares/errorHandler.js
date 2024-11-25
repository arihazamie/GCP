const multer = require("multer");

/**
 * Error handling middleware for Express.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Determine if the error is a Multer error or a general Error
  const isMulterError = err instanceof multer.MulterError;
  const isGeneralError = err instanceof Error;

  if (isGeneralError || isMulterError) {
    const statusCode = err.statusCode || (isMulterError ? 400 : 500);

    // Specific error handling for prediction errors
    if (err.message.includes("[-1,224,224,3]")) {
      return res.status(statusCode).json({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      });
    }

    // Specific error handling for file size limit errors
    if (isMulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000",
      });
    }

    // Generic error response
    return res
      .status(statusCode)
      .json({ status: "fail", message: err.message });
  }

  // Fallback for unhandled errors
  return res
    .status(500)
    .json({ status: "fail", message: "Internal server error: " + err.message });
};

module.exports = errorHandler;
