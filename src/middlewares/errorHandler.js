const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  console.error("Error :", err.message);

  if (err instanceof Error || err instanceof multer.MulterError) {
    const statusCode = err.statusCode ?? 400;

    if (err.message.includes("[-1,224,224,3]")) {
      return res.status(statusCode).json({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      });
    }

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000",
      });
    }

    return res
      .status(statusCode)
      .json({ status: "fail", message: err.message });
  }

  return res.status(500).json({
    status: "fail",
    message: "Internal server error : " + err.message,
  });
};

module.exports = errorHandler;
