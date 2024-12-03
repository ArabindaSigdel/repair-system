const { Vehicle } = require("../../../models/index");
const apiResponse = require("../../../utility/apiResponse");

const getVehicle = async (req, res) => {
  try {
    allVehicles = await Vehicle.find({ owner: req.user.id });

    if (allVehicles.length === 0) {
      res.status(400).json(
        apiResponse({
          success: false,
          message: "No vehicle found",
        })
      );
    }

    res.status(200).json(
      apiResponse({
        success: true,
        message: "List fetched succesfully",
        data: allVehicles,
      })
    );
  } catch (err) {
    res.status(500).json(
      apiResponse({
        success: false,
        message: "Something went wrong. Please try again later",
      })
    );
  }
};

module.exports = getVehicle;
