const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AdminUser } = require("../../../models");
const apiResponse = require("../../../utility/apiResponse");

/**
 * Login Controller
 * Handles user authentication.
 */
const adminLoginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Input Validation
    if (!username || !password) {
      return res.status(400).json(
        apiResponse({
          success: false,
          message: "Validation Error",
          data: {
            errors: ["Username and Password are required"],
          },
        })
      );
    }

    // Check if the user exists
    const adminUser = await AdminUser.findOne({ username });
    if (!adminUser) {
      return res.status(401).json(
        apiResponse({
          success: false,
          message: "Authentication Failed",
          data: {
            errors: ["Invalid Username"],
          },
        })
      );
    }

    if (!adminUser.password) {
      return res.status(401).json(
        apiResponse({
          success: false,
          message: "Authentication Failed",
          data: {
            errors: ["User password does not exist"],
          },
        })
      );
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(401).json(
        apiResponse({
          success: false,
          message: "Authentication Failed",
          data: {
            errors: ["Invalid password"],
          },
        })
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: adminUser._id,
        phone: adminUser.phone,
        role: adminUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Return a success response
    return res.status(200).json(
      apiResponse({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: adminUser._id,
            name: `${adminUser.f_name} ${adminUser.m_name} ${adminUser.l_name}`,
            role: adminUser.role,
          },
          token,
        },
      })
    );
  } catch (err) {
    console.error("Login Error:", err);

    // Handle unexpected errors
    return res.status(500).json(
      apiResponse({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        data: {
          error: err.message,
        },
      })
    );
  }
};

module.exports = adminLoginController;
