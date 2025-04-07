const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    workshop_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Workshop",
      required: [true, "Workshop ID is required"],
    },
    part_name: {
      type: String,
      required: [true, "Part name is required"],
    },
    part_number: {
      type: String,
      required: [true, "Part number (by manufacturer) is required"],
      unique: true,
    },
    manufacturer: {
      type: String,
      required: [true, "Manufacturer name is required"],
    },
    compatible_vehicles: {
      type: [String], // e.g., ["Two-Wheeler", "Four-Wheeler"]
      required: true,
    },
    quantity_in_stock: {
      type: Number,
      default: 0,
    },
    unit_price: {
      type: Number,
      required: [true, "Unit price is required"],
      min: [0, "Unit price must be a positive number"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Available", "Out of Stock"],
      default: function () {
        return this.quantity_in_stock > 0 ? "Available" : "Out of Stock";
      },
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
