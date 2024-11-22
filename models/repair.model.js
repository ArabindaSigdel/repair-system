const { default: mongoose } = require("mongoose");

repairSchema = mongoose.Schema({
  vehicle_id: {
    type: mongoose.Schema.ObjectId,
    ref: "vehicleModel",
    required: [True, "Vehicle Id is required"],
  },
});
