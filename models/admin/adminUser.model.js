const { default: mongoose } = require("mongoose");

const adminUserSchema = mongoose.Schema(
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
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "Manager", "SupportStaff"],
      default: "SupportStaff",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
      unique: true,
    },
    address: { type: String, required: [true, "Address is required"] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const adminUserModel = mongoose.model("AdminUser", adminUserSchema);

module.exports = adminUserModel;
