const { Repair } = require("./../../models/index");

const closeRepairRequestController = async (req, res) => {
  try {
    const { repair_id } = req.body;

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
      return res.status(400).json({
        success: false,
        message: "Repair request not found",
        data: {},
      });
    }

    // Check if the repair request is in "Requested" status
    if (repair.status == "Requested" || repair.status == "Pending") {
          // Update repair request status
    repair.status = "Completed";
    await repair.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Repair request closed successfully",
      data: repair, // Optionally, you can return the updated repair object
    });
      }
    else {
      return res.status(400).json({
        success: false,
        message: "Repair request is not in a state that can be closed",
        data: {},
      });
    }


  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later",
      data: {},
    });
  }
};

module.exports = closeRepairRequestController;
