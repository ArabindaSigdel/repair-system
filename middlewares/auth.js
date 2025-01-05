const apiResponse = require("../utility/apiResponse");
const jwt = require("jsonwebtoken");

/**
 * Authentication Middleware
 * Verifies JWT token, decodes it, and validates roles.
 *
 * @param {Array} allowedRoles - Optional. Array of roles allowed to access the route.
 */
const auth = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(
        apiResponse({
          success: false,
          message: "Authorization failed. Token missing or invalid.",
          data: {},
        })
      );
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    try {
      // Decode and verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach decoded user data to request object
      req.user = decoded;

      // Role-based access control
      if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json(
          apiResponse({
            success: false,
            message: "Access denied. Insufficient permissions.",
            data: {},
          })
        );
      }

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err);

      // Handle JWT errors
      const errorMessages = {
        JsonWebTokenError: "Invalid token.",
        TokenExpiredError: "Token expired.",
        default: "Authorization failed.",
      };

      const message = errorMessages[err.name] || errorMessages.default;

      return res.status(401).json(
        apiResponse({
          success: false,
          message,
          data: {},
        })
      );
    }
  };
  next();
};

module.exports = auth;
