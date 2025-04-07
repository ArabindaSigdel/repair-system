const { Repair } = require("../../../models/index");

const getRepairLogController = async (req, res) => {
  try {
    const repairLogs = await Repair.find({ status: "Requested" });

    res.status(200).json({
      success: true,
      message: "Repair logs fetched successfully",
      data: repairLogs,
    });
  } catch (err) {
    typeof Repair;
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later",
      data: {},
    });
  }
};

module.exports = getRepairLogController;
