const { default: mongoose } = require("mongoose");

const workshopSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    phone: { type: String, unique: [true, "Phone number already exists"] },
    address: { type: String, required: [true, "Address is required"] },
    ratings: { type: Number },
    pan_no: {
      type: String,
      required: [true, "Pan No is required"],
      unique: [true, "PAN no already exists"],
    },
    reg_no: {
      type: String,
      required: [true, "Registration No is required"],
      unique: [true, "Registration No already exists"],
    },
    password: { type: String, required: [true, "Password is required"] },
  },
  { timestamps: true }
);

const workshopModel = mongoose.model("Workshop", workshopSchema);

module.exports = workshopModel;
