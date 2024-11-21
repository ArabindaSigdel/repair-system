const { default: mongoose } = require("mongoose");

vehicleSchema = mongoose.Schema(
  {
    engine_number: {
      type: String,
      required: [True, "Engine Number is required"],
    },
    chassis_number: {
      type: String,
      required: [True, "Chassis Number is required"],
    },
    reg_number: {
      type: String,
      required: [True, "Registration number is required"],
    },
    brand: String,
    color: String,
    model: String,
  },
  { timestamps: true }
);
const vehicleModel = mongoose.model("vehicleModel", vehicleSchema);
module.exports = vehicleModel;
