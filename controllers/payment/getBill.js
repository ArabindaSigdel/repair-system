const { Bill } = require("../../models/index");

const getBill = async (req, res) => {
  try {
    const { bill_id } = req.query;

    // Ensure bill_id is provided
    if (!bill_id) {
      return res.status(400).json({
        success: false,
        message: "Bill ID is required",
        data: {},
      });
    }

    // Find the bill by ID
    const bill = await Bill.findOne({ _id: bill_id })
      .populate("repair_id", "repair_description")
      .populate("workshop_id", "name");

    // Check if the bill exists
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
        data: {},
      });
    }

    // Ensure the logged-in user is authorized to view the bill
    if (bill.customer_id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this bill",
        data: {},
      });
    }

    // Send the bill details
    return res.status(200).json({
      success: true,
      message: "Bill fetched successfully",
      data: {
        _id: bill._id,
        repair_description: bill.repair_id?.repair_description || null,
        workshop_name: bill.workshop_id?.name || null,
        parts_used: bill.parts_used,
        extra_charges: bill.extra_charges,
        parts_total: bill.parts_total,
        charges_total: bill.charges_total,
        grand_total: bill.grand_total,
        payment_status: bill.payment_status,
        payment_reference: bill.payment_reference,
        createdAt: bill.createdAt,
        updatedAt: bill.updatedAt,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later",
      data: {},
    });
  }
};

module.exports = getBill;
