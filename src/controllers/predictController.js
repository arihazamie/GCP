const predictService = require("../services/predictService");
const createPredict = require("../services/createPredict");
const getAllPredict = require("../services/getAllPredict");

/**
 * Handles the prediction request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const predict = async (req, res, next) => {
  try {
    const image = req.file;
    const model = req.app.locals.model;

    if (!model) {
      return res
        .status(500)
        .json({ status: "error", message: "Model failed to load!" });
    }

    if (!image) {
      return res
        .status(400)
        .json({ status: "error", message: "Please insert an image!" });
    }

    const { result, suggestion } = await predictService(model, image.buffer);
    const { id, createdAt } = await createPredict(result, suggestion);

    return res.status(201).json({
      status: "success",
      message: "Model predicted successfully",
      data: { id, result, suggestion, createdAt },
    });
  } catch (error) {
    console.error("Prediction error:", error); // Improved logging
    next(error);
  }
};

/**
 * Retrieves the prediction history.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getPredictHistories = async (req, res, next) => {
  try {
    const history = await getAllPredict();

    return res.status(200).json({ status: "success", data: history });
  } catch (error) {
    console.error("Error fetching prediction history:", error); // Improved logging
    next(error);
  }
};

module.exports = { predict, getPredictHistories };
