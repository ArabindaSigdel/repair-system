const { default: mongoose, model } = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    name: {
      f_name: {
        type: String,
        required: [True, "First name is required"],
      },
      l_name: {
        type: String,
        required: [True, "Last name is required"],
      },
    },
    password: {
      type: String,
      required: [True, "Password is required"],
    },
    email: String,
    phone: {
      type: String,
      required: [True, "Phone number is required"],
    },
    vehicles: [{ type: mongoose.Schema.ObjectId, ref: "Vehicle" }],
  },
  { timestamps: true }
);

const customerModel = mongoose.Model("customerModel", customerSchema);

module.exports = customerModel;
