const { default: mongoose } = require("mongoose");
const { User } = require("../../models/index");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const { f_name, m_name, l_name, password, address, phone, email } = req.body;

  try {
    //Validate Password
    const passwordRegex =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: [
          "Password must include one uppercase letter, one lowercase letter, one number, and one special character",
        ],
      });
    }

    // Hash the password
    const enPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );

    // Create the new user
    const newUser = await User.create({
      f_name: f_name.trim(),
      m_name: m_name.trim(),
      l_name: l_name.trim(),
      password: enPassword,
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
    });

    // Success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err.message.red);
    console.log(err.name.yellow);

    // Error handling with a switch statement
    switch (err.name) {
      case "ValidationError":
        // Handle Mongoose validation errors
        const validationErrors = Object.values(err.errors).map(
          (error) => error.message
        );
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: validationErrors,
        });

      case "MongoServerError":
        // Handle MongoDB duplicate key errors
        if (err.code === 11000) {
          const duplicateField = Object.keys(err.keyValue)[0];
          return res.status(400).json({
            success: false,
            message: `${duplicateField} already exists. Please use a different ${duplicateField}.`,
          });
        }
        break;

      default:
        // Handle unexpected errors
        console.error("Unexpected Error:", err);
        return res.status(500).json({
          success: false,
          message: "An unexpected error occurred. Please try again later.",
        });
    }
  }
};

module.exports = userRegister;
