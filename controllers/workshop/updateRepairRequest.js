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

    // Validate and append new parts_used
    if (parts_used && Array.isArray(parts_used)) {
      const validParts = [];
      for (const part of parts_used) {
        const part_cost = Number(part.part_cost);
        const quantity = Number(part.quantity);

        if (
          !part.part_name ||
          typeof part.part_name !== "string" ||
          isNaN(part_cost) ||
          isNaN(quantity)
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid parts_used data. Ensure all fields are valid.",
            data: {
              invalidPart: part,
            },
          });
        }

        validParts.push({
          part_name: part.part_name,
          part_cost,
          quantity,
        });
      }

      repair.parts_used = [...repair.parts_used, ...validParts];
    }

    // Validate and append new extra_charges
    if (extra_charges && Array.isArray(extra_charges)) {
      const validCharges = [];
      for (const charge of extra_charges) {
        const charge_cost = Number(charge.charge_cost);

        if (
          !charge.charge_name ||
          typeof charge.charge_name !== "string" ||
          isNaN(charge_cost)
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid extra_charges data. Ensure all fields are valid.",
            data: {
              invalidCharge: charge,
            },
          });
        }

        validCharges.push({
          charge_name: charge.charge_name,
          charge_cost,
        });
      }

      repair.extra_charges = [...repair.extra_charges, ...validCharges];
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
