const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/index");
const apiResponse = require("../../utility/apiResponse");

/**
 * Login Controller
 * Handles user authentication.
 */
const loginController = async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Input Validation
    if (!phone || !password) {
      return res.status(400).json(
        apiResponse({
          success: false,
          message: "Validation Error",
          data: {
            errors: ["phone and password are required"],
          },
        })
      );
    }

    // Check if the user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json(
        apiResponse({
          success: false,
          message: "Authentication Failed",
          data: {
            errors: ["Invalid phone number"],
          },
        })
      );
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
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
        id: user._id,
        phone: user.phone,
        role: user.role,
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
            id: user._id,
            name: `${user.f_name} ${user.m_name} ${user.l_name}`,
            phone: user.phone,
            role: user.role,
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

module.exports = loginController;
