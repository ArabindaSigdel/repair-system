const { Repair } = require("./../../models/index");

const updateRepairRequestController = async (req, res) => {
  try {
    const { repair_id, parts_used, extra_charges } = req.body;

    // Ensure repair_id is provided
    if (!repair_id) {
      return res.status(400).json({
        success: false,
        message: "Repair id is required",
        data: {},
      });
    }

    // Find the repair request by id
    const repair = await Repair.findOne({ _id: repair_id });
    if (!repair) {
      return res.status(404).json({
        success: false,
        message: "Repair request not found",
        data: {},
      });
    }

    // Check if the logged-in workshop is authorized to edit this repair request
    if (repair.workshop_id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this repair request",
        data: {},
      });
    }

    // Append new parts_used and extra_charges to existing data
    if (parts_used && Array.isArray(parts_used)) {
      repair.parts_used = [...repair.parts_used, ...parts_used];
    }
    if (extra_charges && Array.isArray(extra_charges)) {
      repair.extra_charges = [...repair.extra_charges, ...extra_charges];
    }

    // Update the status to "Pending"
    repair.status = "Pending";

    // Save the updated repair request
    await repair.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Repair request updated successfully",
      data: repair,
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

module.exports = updateRepairRequestController;
