const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    f_name: { type: String, required: [true, "First name is required"] },
    m_name: { type: String, default: "" },
    l_name: { type: String, required: [true, "Last name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["Admin", "Mechanic", "Customer"],
      default: "Customer",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
      unique: true,
    },
    address: { type: String, required: [true, "Address is required"] },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
