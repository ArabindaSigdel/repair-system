const { default: mongoose } = require("mongoose");

const billSchema = mongoose.Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle Id is required"],
    },
    workshop_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Workshop",
      required: [true, "Workshop Id is required"],
    },
    items: [
      {
        part_id: {
          type: mongoose.Schema.ObjectId,
          ref: "Part",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price must be 0 or more"],
        },
        total: {
          type: Number,
          required: true,
          min: [0, "Total must be 0 or more"],
        },
      },
    ],
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
