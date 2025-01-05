const apiResponse = require("../../../utility/apiResponse");
const { AdminUser } = require("../../../models/index");
const bcrypt = require("bcrypt");

const adminRegisterController = async (req, res) => {
  const {
    f_name,
    m_name,
    l_name,
    username,
    password,
    address,
    phone,
    email,
    role,
  } = req.body;

  try {
    // Check if the user exists
    const userExists = await AdminUser.findOne({ username });
    if (userExists) {
      return res.status(400).json(
        apiResponse({
          success: false,
          message: "Validation Error",
          data: {
            errors: ["User already exists"],
          },
        })
      );
    }

    //Validate Password
    const passwordRegex =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json(
        apiResponse({
          success: false,
          message: "Validation Error",
          data: {
            errors: [
              "Password must include one uppercase letter, one lowercase letter, one number, and one special character",
            ],
          },
        })
      );
    }

    // Hash the password
    const enPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
    );

    //Create User
    const newUser = await AdminUser.create({
      f_name: f_name.trim(),
      m_name: m_name.trim(),
      l_name: l_name.trim(),
      username: username.trim(),
      password: enPassword,
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
      role: role.trim(),
    });

    res.status(200).json(
      apiResponse({
        success: true,
        message: "User Created. Please check email for user detail",
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(
      apiResponse({
        success: false,
        message: "Something went wrong. Please try again later",
        data: {
          error: err.message,
        },
      })
    );
  }
};

module.exports = adminRegisterController;
