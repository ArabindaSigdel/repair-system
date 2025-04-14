const { Repair } = require("./../../models/index");

const getUserRepairs = async (req, res) => {
  try {
    const { status } = req.query; // Get the status filter from query parameters
    const filter = { customer_id: req.user.id }; // Filter by logged-in user's ID

    if (status) {
      filter.status = status; // Add status filter if provided
    }

    // Fetch repairs and populate related fields
    const repairs = await Repair.find(filter)
      .populate("vehicle_id", "brand model") // Populate vehicle details
      .populate("workshop_id", "name"); // Populate workshop name

    // Flatten the response to avoid nested keys
    const flattenedRepairs = repairs.map((repair) => ({
      _id: repair._id,
      vehicle_make: repair.vehicle_id?.brand || null,
      vehicle_model: repair.vehicle_id?.model || null,
      workshop_name: repair.workshop_id?.name || null,
      repair_description: repair.repair_description,
      status: repair.status,
      parts_used: repair.parts_used,
      extra_charges: repair.extra_charges,
      bill_status: repair.bill_status,
      bill_id: repair.bill_id,
      payment_status: repair.payment_status,
      createdAt: repair.createdAt,
      updatedAt: repair.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      message: "Repair requests fetched successfully",
      data: flattenedRepairs,
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

module.exports = getUserRepairs;
