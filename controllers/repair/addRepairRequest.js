const { Repair } = require("./../../models/index");

const addRepairRequest = async (req, res) => {
  try {
    const { vehicle_id, description } = req.body;
    if (!vehicle_id || !description) {
      res.status(400).body({
        status: false,
        message: "Vehicle id and description are required",
        data: {},
      });
    }

    const isRepairPending = await Repair.findOne({
      vehicle_id,
    });

    if (isRepairPending) {
      return res.status(400).json({
        success: false,
        message: "Vehicle already has repair request pending",
        data: {},
      });
    }

    const newRepair = await Repair.create({
      customer_id: req.user.id,
      vehicle_id: vehicle_id,
      repair_description: description,
      status: "Requested",
    });

    return res.status(200).json({
      success: true,
      message: "Repair request made succesfully",
      data: newRepair,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "Something went wrong. Please try again later",
      data: {},
    });
  }
};

module.exports = addRepairRequest;
