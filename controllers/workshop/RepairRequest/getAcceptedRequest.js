const { Repair } = require("../../../models/index");

const getAcceptedRequestController = async (req, res) => {
  try {
    const repairLogs = await Repair.find({
      status: "Accepted",
      workshop_id: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Repair logs fetched successfully",
      data: repairLogs,
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

module.exports = getAcceptedRequestController;
