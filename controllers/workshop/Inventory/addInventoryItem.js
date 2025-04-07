const { Inventory } = require("./../../../models/index");

const addInventoryItemController = async (req, res) => {
  const {
    part_name,
    part_number,
    manufacturer,
    compatible_vehicles,
    quantity,
    unit_price,
    description,
  } = req.body;
  try {
    const existingPart = await Inventory.findOne({
      part_name,
      manufacturer,
    });

    if (existingPart) {
      res.status(400).json({
        success: false,
        message:
          "This part already exists please update the item instead",
        data: {},
      });
    }

    const newPart = await Inventory.create({
      workshop_id: req.user.id,
      part_name,
      part_number,
      manufacturer,
      compatible_vehicles,
      quantity_in_stock: quantity,
      unit_price,
      description,
    });

    res.status(200).json({
      success: true,
      message: "Item added successfully",
      data: newPart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Somthing went wrong. Please try again later",
      data: {},
    });
  }
};

module.exports = addInventoryItemController;
