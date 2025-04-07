const { Inventory } = require("../../../models/index");

const updateInventoryItemsController = async (req, res) => {
  const {
    part_id,
    part_name,
    part_number,
    manufacturer,
    compatible_vehicles,
    quantity,
    unit_price,
    description,
  } = req.body;

  // Validation: Ensure part_id is provided
  if (!part_id || typeof part_id !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing 'part_id'.",
      data: {},
    });
  }

  try {
    // Find the inventory item by part_id and ensure it belongs to the logged-in workshop
    const existingPart = await Inventory.findOne({
      _id: part_id,
      workshop_id: req.user.id, // Ensure it belongs to the logged-in workshop
    });

    if (!existingPart) {
      return res.status(404).json({
        success: false,
        message: "This part does not exist in your workshop.",
        data: {},
      });
    }

    // Update only the fields that are provided in the request body
    if (part_name !== undefined) {
      existingPart.part_name = part_name;
    }
    if (part_number !== undefined) {
      existingPart.part_number = part_number;
    }
    if (manufacturer !== undefined) {
      existingPart.manufacturer = manufacturer;
    }
    if (compatible_vehicles !== undefined) {
      if (
        Array.isArray(compatible_vehicles) &&
        compatible_vehicles.every((v) => typeof v === "string")
      ) {
        existingPart.compatible_vehicles = compatible_vehicles;
      } else {
        return res.status(400).json({
          success: false,
          message:
            "'compatible_vehicles' must be a non-empty array of strings.",
          data: {},
        });
      }
    }
    if (quantity !== undefined) {
      if (typeof quantity === "number" && quantity >= 0) {
        existingPart.quantity_in_stock = quantity;
      } else {
        return res.status(400).json({
          success: false,
          message: "'quantity' must be a non-negative number.",
          data: {},
        });
      }
    }
    if (unit_price !== undefined) {
      if (typeof unit_price === "number" && unit_price >= 0) {
        existingPart.unit_price = unit_price;
      } else {
        return res.status(400).json({
          success: false,
          message: "'unit_price' must be a non-negative number.",
          data: {},
        });
      }
    }
    if (description !== undefined) {
      existingPart.description = description;
    }

    // Save the updated item
    await existingPart.save();

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: existingPart,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      data: {},
    });
  }
};

module.exports = updateInventoryItemsController;
