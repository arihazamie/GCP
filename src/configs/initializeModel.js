const tf = require("@tensorflow/tfjs-node");

/**
 * Initializes the TensorFlow model and attaches it to the app's local context.
 * @param {Object} app - The Express app instance.
 */
const initializeModel = async (app) => {
  try {
    if (!process.env.MODEL_URL) {
      throw new Error("MODEL_URL environment variable is not set.");
    }

    const model = await tf.loadGraphModel(process.env.MODEL_URL);
    app.locals.model = model;

    console.log("Model loaded successfully!");
  } catch (error) {
    console.error("Error loading model:", error);
    throw error; // Rethrow the error to handle it at a higher level if needed
  }
};

module.exports = initializeModel;
