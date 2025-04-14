const { Repair } = require("../../models/index");

const getRepairLogController = async (req, res) => {
  try {
    const repairLogs = await Repair.find({ status: "Requested" })
      .populate("customer_id", "f_name m_name l_name email phone address")
      .populate("vehicle_id", "brand model"); // Populate user details

    const flattenedRepairs = repairLogs.map((repair) => ({
      _id: repair._id,
      customer_name: `${repair.customer_id.f_name} ${
        repair.customer_id.m_name ? repair.customer_id.m_name + " " : ""
      }${repair.customer_id.l_name}`,
      customer_email: repair.customer_id.email,
      customer_phone: repair.customer_id.phone,
      customer_address: repair.customer_id.address,
      vehicle_make: repair.vehicle_id?.brand || null,
      vehicle_model: repair.vehicle_id?.model || null,
      repair_description: repair.repair_description,
      status: repair.status,
      createdAt: repair.createdAt,
      updatedAt: repair.updatedAt,
    }));

    res.status(200).json({
      success: true,
      message: "Repair logs fetched successfully",
      data: flattenedRepairs,
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

module.exports = getRepairLogController;
