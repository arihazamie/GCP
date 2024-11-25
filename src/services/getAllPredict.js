const { Firestore } = require("@google-cloud/firestore");
const { formatDate } = require("../utils/dateUtil");

// Load service account key for Firestore
const db = new Firestore({
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
  projectId: "submissionmlgc-ari",
});
const predictCollection = db.collection("predictions");

/**
 * Retrieves all prediction records from Firestore.
 * @returns {Promise<Array>} - An array of prediction records.
 */
const getAllPredict = async () => {
  try {
    const predictsSnapshot = await predictCollection.get();
    const predicts = predictsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data, createdAt: formatDate(data.createdAt.toDate()) };
    });
    return predicts;
  } catch (error) {
    console.error("Error fetching prediction records:", error);
    throw new Error("Failed to fetch prediction records."); // Re-throw error for higher-level handling
  }
};

module.exports = getAllPredict;
