const { Bill, Repair } = require("../../models/index.js");

const generateBillController = async (req, res) => {
  try {
    const { repair_id } = req.body;

    // Ensure repair_id is provided
    if (!repair_id) {
      return res.status(400).json({
        success: false,
        message: "Repair ID is required",
        data: {},
      });
    }

    // Find the repair request by id
    const repair = await Repair.findOne({ _id: repair_id })
      .populate("customer_id", "f_name l_name")
      .populate("workshop_id", "name");
    if (!repair) {
      return res.status(404).json({
        success: false,
        message: "Repair request not found",
        data: {},
      });
    }

    // Check if the logged-in workshop is authorized to generate the bill
    if (!repair.workshop_id.equals(req.user.id)) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to generate a bill for this repair request",
        data: {},
      });
    }

    // Calculate total for parts_used
    const partsTotal = repair.parts_used.reduce(
      (total, part) => total + part.part_cost * part.quantity,
      0
    );

    // Calculate total for extra_charges
    const chargesTotal = repair.extra_charges.reduce(
      (total, charge) => total + charge.charge_cost,
      0
    );

    // Calculate grand total
    const grandTotal = partsTotal + chargesTotal;

    // Check if a bill already exists for this repair request
    const existingBill = await Bill.findOne({ repair_id });
    if (existingBill) {
      return res.status(400).json({
        success: false,
        message: "Bill already exists for this repair request",
        data: existingBill,
      });
    }

    // Create a new bill
    const newBill = await Bill.create({
      repair_id: repair._id,
      customer_id: repair.customer_id._id,
      workshop_id: repair.workshop_id._id,
      parts_used: repair.parts_used,
      extra_charges: repair.extra_charges,
      parts_total: partsTotal,
      charges_total: chargesTotal,
      grand_total: grandTotal,
      payment_status: "Pending", // Default to "Pending"
    });

    // Update the repair request with the bill_id and change bill_status to "Billed"
    repair.bill_id = newBill._id;
    repair.bill_status = "Billed";
    await repair.save();

    // Send success response
    return res.status(201).json({
      success: true,
      message: "Bill generated successfully",
      data: newBill,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later",
      data: {},
    });
  }
};

module.exports = generateBillController;
