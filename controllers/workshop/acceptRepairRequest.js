const { Repair } = require("./../../models/index");

const acceptRepairRequestController = async (req, res) => {
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
    if (repair.status !== "Requested") {
      return res.status(400).json({
        success: false,
        message: "Repair request is not pending",
        data: {},
      });
    }

    // Update repair request status and assign workshop_id
    repair.status = "Accepted";
    repair.workshop_id = req.user.id;
    await repair.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Repair request accepted successfully",
      data: repair, // Optionally, you can return the updated repair object
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

module.exports = acceptRepairRequestController;
