const { Inventory } = require("../../../models/index");
const apiResponse = require("../../../utility/apiResponse");

const getInventoryItemsController = async (req, res) => {
  try {
    const { part_name, manufacturer, compatible_vehicles, part_number } =
      req.query;

    const query = {
      workshop_id: req.user.id, // Restrict to the logged-in workshop
    };

    if (part_name) {
      const words = part_name.split(" ").filter(Boolean);
      query.part_name = {
        $and: words.map((word) => ({
          $regex: new RegExp(word, "i"), // case-insensitive
        })),
      };
    }

    if (manufacturer) {
      query.manufacturer = { $regex: manufacturer, $options: "i" };
    }

    if (compatible_vehicles) {
      query.compatible_vehicles = { $in: [compatible_vehicles] };
    }

    if (part_number) {
      query.part_number = { $regex: part_number, $options: "i" };
    }

    const items = await Inventory.find(query);
    return res.status(200).json(
      apiResponse({
        success: true,
        message: "Inventory fetched successfully",
        data: items,
      })
    );
  } catch (err) {
    console.error("Error fetching inventory:", err);
    return res.status(500).json(
      apiResponse({
        success: false,
        message: "Failed to fetch inventory",
        data: { error: err.message },
      })
    );
  }
};

module.exports = getInventoryItemsController;
