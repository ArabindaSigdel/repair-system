const mongoose = require("mongoose");

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
        part_id: {
          type: mongoose.Schema.ObjectId,
          ref: "Inventory",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        is_covered_by_warrenty: {
          type: Boolean,
          default: false,
        },
      },
    ],
    bill: {
      type: mongoose.Schema.ObjectId,
      ref: "Bill",
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const repairModel = mongoose.model("RepairCard", repairSchema);

module.exports = repairModel;
