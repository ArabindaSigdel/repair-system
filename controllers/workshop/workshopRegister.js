const bcrypt = require("bcrypt");
const { Workshop } = require("../../models/index");
const apiResponse = require("../../utility/apiResponse");

const workshopRegisterController = async (req, res) => {
  const { name, email, phone, address, pan_no, reg_no, password, specialization } = req.body;
  try {
    const workshop = await Workshop.findOne({ email });
    if (workshop) {
      return res.status(400).json(
        apiResponse({
          success: false,
          message: "User already exist",
        })
      );
    }

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

    const enPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );
    const newWorkshop = await Workshop.create({
      password: enPassword,
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      pan_no: pan_no.trim(),
      reg_no: reg_no.trim(),
      name: name.trim(),
      specialization
    });

    delete newWorkshop.password;

    res.status(200).json(
      apiResponse({
        success: true,
        message: "Workshop registered successfully",
        data: { newWorkshop },
      })
    );
  } catch (err) {
    switch (err.constructor.name) {
      case "ValidationError":
        const validationErrors = Object.values(err.errors).map(
          (error) => error.message
        );
        return res.status(400).json(
          apiResponse({
            success: false,
            message: "Validation Error",
            data: {
              errors: validationErrors,
            },
          })
        );

      default:
        console.log(err);
        res.status(500).json(
          apiResponse({
            success: false,
            message: "Internal Server Error",
          })
        );
    }
  }
};

module.exports = workshopRegisterController;
