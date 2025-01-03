const apiResponse = require("../../utility/apiResponse");
const { Workshop } = require("../../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const workshopLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(
        apiResponse({
          success: false,
          message: "Validation Error",
          data: { error: ["Username and Password is required"] },
        })
      );
    }

    const workshopUser = await Workshop.findOne({ email });

    if (workshopUser === null) {
      return res.status(400).json(
        apiResponse({
          success: false,
          message: "Validation Error",
          data: { error: ["User not found"] },
        })
      );
    }
    console.log("Password: " + password);
    const isMatch = await bcrypt.compare(password, workshopUser.password);
    if (!isMatch) {
      return res.status(401).json(
        apiResponse({
          success: false,
          message: "Validaion Failed",
          data: { error: ["Invalid password"] },
        })
      );
    }

    const token = jwt.sign(
      { id: workshopUser._id, role: "workshop" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(200).json({
      success: true,
      message: "Login successfully",
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
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = workshopLoginController;
