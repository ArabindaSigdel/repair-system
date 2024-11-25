// src/utils/apiResponse.js

/**
 * Utility function to standardize API responses.
 *
 * @param {Object} options - The response options.
 * @param {boolean} options.status - Indicates success or failure.
 * @param {string} options.message - A brief description of the response.
 * @param {Object} [options.data=null] - The actual response data.
 * @returns {Object} Standardized API response.
 */
const apiResponse = ({ success, message, data = null }) => {
  return {
    success,
    message,
    data,
  };
};

module.exports = apiResponse;
