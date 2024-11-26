const { Firestore } = require("@google-cloud/firestore");
const crypto = require("crypto");
const { formatDate } = require("../utils/dateUtil");

require("dotenv").config();

// Load service account key for Firestore
const db = new Firestore({
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
  projectId: "submissionmlgc-arihzm",
});
const predictCollection = db.collection("predictions");
/**
 * Creates a new prediction record in Firestore.
 * @param {string} result - The prediction result.
 * @param {string} suggestion - The prediction suggestion.
 * @returns {Promise<Object>} - The created prediction ID and timestamp.
 */
const createPredict = async (result, suggestion) => {
  const id = crypto.randomUUID();
  const createdAt = new Date();

  console.log("Creating prediction with:", { id, result, suggestion }); // Debugging log

  try {
    await predictCollection.doc(id).set({ id, result, suggestion, createdAt });
    return { id, createdAt: formatDate(createdAt) };
  } catch (error) {
    console.error("Error creating prediction record:", error);
    console.error("Error details:", error.details); // Log additional error details
    throw new Error("Failed to create prediction record."); // Re-throw error for higher-level handling
  }
};

module.exports = createPredict;
