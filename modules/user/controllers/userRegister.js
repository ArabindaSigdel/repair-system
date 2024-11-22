const { default: mongoose } = require("mongoose");

const userRegister = async (req, res) => {
  const Users = mongoose.model("User");
  const { f_name, m_name, l_name, password, address, phone, email } = req.body;
  console.log(
    `f_name: ${f_name}\n
    m_name: ${m_name}\n
    l_name: ${l_name}\n
    password: ${password}\n
    address: ${address}\n
    phone: ${phone}\n
    email: ${email}`
  );

  res.status(200).json({
    message: "You have reached usermodel",
  });
};

module.exports = userRegister;
