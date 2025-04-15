const { Repair } = require("./../../models/index");

const addRepairRequest = async (req, res) => {
  try {
    const { vehicle_id, description } = req.body;

    // Ensure vehicle_id and description are provided
    if (!vehicle_id || !description) {
      return res.status(400).json({
        success: false,
        message: "Vehicle id and description are required",
        data: {},
      });
    }

    // Count the number of active repair requests for the vehicle
    const activeRepairsCount = await Repair.countDocuments({
      vehicle_id,
      status: { $in: ["Requested", "Accepted", "Pending"] }, // Active statuses
    });

    // Check if the count exceeds the limit
    if (activeRepairsCount >= 3) {
      return res.status(400).json({
        success: false,
        message: "Vehicle already has 3 active repair requests",
        data: {},
      });
    }

    // Create a new repair request
    const newRepair = await Repair.create({
      customer_id: req.user.id,
      vehicle_id: vehicle_id,
      repair_description: description,
      status: "Requested",
    });

    return res.status(200).json({
      success: true,
      message: "Repair request made successfully",
      data: newRepair,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later",
      data: {},
    });
  }
};

module.exports = addRepairRequest;
