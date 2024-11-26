const vehicleModel = require("../../../models/vehicle.model");

const addVehicle = async (req, res) => {
  const { engine_number, chassis_number, reg_number, brand, color, model } =
    req.body;

  console.log(req.user);
  //   const newVehicle = await vehicleModel.create({
  //     model: model,
  //     engine_number: engine_number,
  //     chassis_number: chassis_number,
  //     reg_number: reg_number,
  //     model: model,
  //     color: color,
  //     owner: req.user._id,
  //   });
};

module.exports = addVehicle;
