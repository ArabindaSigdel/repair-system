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

  // Validation: Ensure required fields are not empty or invalid
  if (!part_name || typeof part_name !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing 'part_name'.",
      data: {},
    });
  }

  if (!part_number || typeof part_number !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing 'part_number'.",
      data: {},
    });
  }

  if (!manufacturer || typeof manufacturer !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing 'manufacturer'.",
      data: {},
    });
  }

  if (
    !Array.isArray(compatible_vehicles) ||
    compatible_vehicles.length === 0 ||
    !compatible_vehicles.every((v) => typeof v === "string")
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid or missing 'compatible_vehicles'. It must be a non-empty array of strings.",
      data: {},
    });
  }

  if (quantity === undefined || typeof quantity !== "number" || quantity < 0) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid or missing 'quantity'. It must be a non-negative number.",
      data: {},
    });
  }

  if (
    unit_price === undefined ||
    typeof unit_price !== "number" ||
    unit_price < 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid or missing 'unit_price'. It must be a non-negative number.",
      data: {},
    });
  }

  try {
    // Find the inventory item by part_number, manufacturer, and workshop_id
    const existingPart = await Inventory.findOne({
      part_id,
      workshop_id: req.user.id, // Ensure it belongs to the logged-in workshop
    });

    if (!existingPart) {
      return res.status(404).json({
        success: false,
        message:
          "This part does not exist in your workshop. Please add the item instead.",
        data: {},
      });
    }

    // Update the fields
    existingPart.part_name = part_name;
    existingPart.compatible_vehicles = compatible_vehicles;
    existingPart.quantity_in_stock = quantity;
    existingPart.unit_price = unit_price;
    existingPart.description = description;

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
