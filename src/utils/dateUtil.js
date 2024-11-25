/**
 * Adjusts the date to UTC+7.
 * @param {Date} date - The date object to format.
 * @returns {Date} - The adjusted date.
 */
const formatDate = (date) => {
  const adjustedDate = new Date(date);
  adjustedDate.setUTCHours(adjustedDate.getUTCHours() + 7);
  return adjustedDate;
};

module.exports = { formatDate };
