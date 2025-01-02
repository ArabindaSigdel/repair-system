const { Vehicle } = require("../../models/index");
const apiResponse = require("../../utility/apiResponse");

const addVehicle = async (req, res) => {
  const { engine_number, chassis_number, reg_number, brand, color, model } =
    req.body;

  try {
    const newVehicle = await Vehicle.create({
      engine_number: engine_number,
      chassis_number: chassis_number,
      reg_number: reg_number,
      model: model,
      color: color,
      brand: brand,
      owner: req.user.id,
    });

    res.status(200).json(
      apiResponse({
        success: true,
        message: "Vehicle added successfully",
        data: newVehicle,
      })
    );
  } catch (err) {
    switch (err.name) {
      case "ValidationError":
        // Handle Mongoose validation errors
        const validationErrors = Object.values(err.errors).map(
          (error) => error.message
        );
        return res.status(400).json(
          apiResponse({
            success: false,
            message: "Validation Error",
            errors: validationErrors,
          })
        );

      case "MongoServerError":
        // Handle MongoDB duplicate key errors
        if (err.code === 11000) {
          const duplicateField = Object.keys(err.keyValue)[0];
          return res.status(400).json(
            apiResponse({
              success: false,
              message: `${duplicateField} already exists. Please use a different ${duplicateField}.`,
              data: {},
            })
          );
        }
        break;

      default:
        // Handle unexpected errors
        console.error("Unexpected Error:", err);
        return res.status(500).json(
          apiResponse({
            success: false,
            message: "Somthing went wrong. Please try again later",
          })
        );
    }
  }
};

module.exports = addVehicle;
