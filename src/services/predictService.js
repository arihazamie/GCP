const tf = require("@tensorflow/tfjs-node");
const { response } = require("express");
/**
 * Makes a prediction based on the provided model and image.
 * @param {Object} model - The TensorFlow model.
 * @param {Buffer} image - The image buffer to predict on.
 * @returns {Promise<Object>} - The prediction result and suggestion.
 */
const predictService = async (model, image) => {
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  const predictionTensor = model.predict(tensor);
  const scores = await predictionTensor.data();

  const { result, suggestion } =
    scores > 0.8
      ? { result: "Cancer", suggestion: "Segera periksa ke dokter!" }
      : {
          result: "Non-cancer",
          suggestion: "Penyakit kanker tidak terdeteksi.",
        };

  return { result, suggestion };
};

module.exports = predictService;
