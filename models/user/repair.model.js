const { default: mongoose } = require("mongoose");

repairSchema = mongoose.Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle Id is required"],
    },
    workshop_id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Workshop Id is required"],
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
  },
  { timestamps: true }
);
