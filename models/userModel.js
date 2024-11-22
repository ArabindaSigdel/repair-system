const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  f_name: { type: String, required: true },
  m_name: { type: String },
  l_name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Use strong password",
    ],
  },
  role: {
    type: String,
    enum: ["Admin", "Mechanic", "Customer"],
    default: "Customer",
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minlength: [10, "Phone number must be atleast 10 digits"],
    maxlenth: [10, "Phone number must be atmost 10 digits "],
  },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
