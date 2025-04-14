const mongoose = require("mongoose");
const Repair = require("./repair.model"); // Import the Repair model

const billSchema = mongoose.Schema(
  {
    repair_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Repair",
      required: [true, "Repair ID is required"],
    },
    customer_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Customer ID is required"],
    },
    workshop_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Workshop",
      required: [true, "Workshop ID is required"],
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
        charge_name: { type: String, required: [true, "Charge name is required"] },
        charge_cost: { type: Number, required: [true, "Charge cost is required"] },
      },
    ],
    parts_total: {
      type: Number,
      required: [true, "Parts total is required"],
    },
    charges_total: {
      type: Number,
      required: [true, "Charges total is required"],
    },
    grand_total: {
      type: Number,
      required: [true, "Grand total is required"],
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    payment_reference: {
      type: String, // Store the payment reference ID (e.g., from a payment gateway)
    },
  },
  { timestamps: true }
);

// Middleware to update the Repair model when the Bill is updated
billSchema.post("save", async function (doc) {
  try {
    // Find the corresponding Repair document and update its fields
    await Repair.findOneAndUpdate(
      { bill_id: doc._id }, // Match the Repair document using the bill_id
      {
        bill_status: doc.payment_status === "Completed" ? "Paid" : "Billed", // Update bill_status
        payment_status: doc.payment_status, // Sync payment_status
        payment_reference: doc.payment_reference, // Sync payment_reference
      }
    );
  } catch (err) {
    console.error("Error updating Repair model from Bill middleware:", err);
  }
});

module.exports = mongoose.model("Bill", billSchema);