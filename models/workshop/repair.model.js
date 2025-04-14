const mongoose = require("mongoose");
const { Bill } = require("..");

const repairSchema = mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    vehicle_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle Id is required"],
    },
    workshop_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Workshop",
    },
    repair_description: {
      type: String,
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      enum: ["Requested", "Accepted", "Pending", "Completed", "Re-opened"],
      default: "Requested",
    },
    parts_used: [
      {
        part_name: { type: String, required: [true, "Part name is required"] },
        part_cost: { type: Number, required: [true, "Part cost is required"] },
        quantity: { type: Number, required: [true, "Quantity is required"] },
      },
    ],
    extra_charges: [
      {
        charge_name: {
          type: String,
          required: [true, "Charge name is required"],
        },
        charge_cost: {
          type: Number,
          required: [true, "Charge cost is required"],
        },
      },
    ],
    bill_status: {
      type: String,
      enum: ["Pending", "Billed", "Paid"],
      default: "Pending",
    },
    bill_id : {
      type: mongoose.Schema.ObjectId,
      ref: "Bill",
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending", // Default to "Pending" until payment is confirmed
    },
    payment_reference: {
      type: String, // Store the payment reference ID (e.g., `pidx` from Khalti)
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const repairModel = mongoose.model("Repair", repairSchema);

module.exports = repairModel;
