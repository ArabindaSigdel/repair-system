const mongoose = require("mongoose");

// Define the vehicle schema
const vehicleSchema = new mongoose.Schema(
  {
    engine_number: {
      type: String,
      required: [true, "Engine number is required"],
      unique: true,
    },
    chassis_number: {
      type: String,
      required: [true, "Chassis number is required"],
      unique: true,
    },
    reg_number: {
      type: String,
      required: [true, "Registration number is required"],
      unique: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    color: {
      type: String,
      default: "Unknown",
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // A vehicle must have an owner
    },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Define and export the vehicle model
const vehicleModel = mongoose.model("Vehicle", vehicleSchema);

module.exports = vehicleModel;
