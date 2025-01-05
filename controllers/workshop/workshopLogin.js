const apiResponse = require("../../utility/apiResponse");
const { Workshop } = require("../../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const workshopLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json(
        apiResponse({
          success: false,
          message: "Validation Error",
          data: { errors: ["Email and Password are required"] },
        })
      );
    }

    // Find the workshop user by email
    const workshopUser = await Workshop.findOne({ email });
    if (!workshopUser) {
      return res.status(401).json(
        apiResponse({
          success: false,
          message: "Authentication Failed",
          data: { errors: ["Invalid email or password"] },
        })
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, workshopUser.password);
    if (!isMatch) {
      return res.status(401).json(
        apiResponse({
          success: false,
          message: "Authentication Failed",
          data: { errors: ["Invalid email or password"] },
        })
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: workshopUser._id, role: "Workshop" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Respond with success
    return res.status(200).json(
      apiResponse({
        success: true,
        message: "Login successful",
        data: {
          workshop: {
            name: workshopUser.name,
            email: workshopUser.email,
            phone: workshopUser.phone,
            address: workshopUser.address,
            pan_no: workshopUser.pan_no,
            reg_no: workshopUser.reg_no,
            ratings: workshopUser.ratings,
          },
          token,
        },
      })
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json(
      apiResponse({
        success: false,
        message: "Internal Server Error",
        data: { errors: [err.message] },
      })
    );
  }
};

module.exports = workshopLoginController;
