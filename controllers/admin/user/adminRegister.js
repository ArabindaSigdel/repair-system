const { AdminUser } = require("../../../models/index.js")
const bycrypt = require("bycrypt")

const = adminRegisterController = async (req, res) => {
  try {
    const { f_name, m_name, l_name, username, password, email, phone } = req.body;
    const enPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );
    AdminUser.create({
      f_name,
      m_name,
      l_name,
      username,
      password: enPassword,
      email,
      phone,
    })
  } catch (err) {
    console.log(err)
  }
}