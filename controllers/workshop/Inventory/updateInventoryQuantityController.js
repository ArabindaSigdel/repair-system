const { Inventory } = require("../../../models/index");

const updateInventoryQuantityController = async (req, res) => {
  const { part_id, quantity } = req.body;

  // Validation: Ensure required fields are not empty or invalid
  if (!part_id || typeof part_id !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing 'part_id'.",
      data: {},
    });
  }

  if (quantity === undefined || typeof quantity !== "number" || quantity < 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing 'quantity'. It must be a non-negative number.",
      data: {},
    });
  }

  try {
    // Find the inventory item by part_id and ensure it belongs to the logged-in workshop
    const inventoryItem = await Inventory.findOne({
      _id: part_id,
      workshop_id: req.user.id, // Ensure it belongs to the logged-in workshop
    });

    if (!inventoryItem) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found in your workshop.",
        data: {},
      });
    }

    // Update the quantity
    inventoryItem.quantity_in_stock += quantity;

    // Save the updated item
    await inventoryItem.save();

    return res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      data: inventoryItem,
    });
  } catch (err) {
    console.error("Error updating quantity:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update quantity. Please try again later.",
      data: { error: err.message },
    });
  }
};

module.exports = updateInventoryQuantityController;