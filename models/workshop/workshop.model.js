const { default: mongoose } = require("mongoose");

const workshopSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  phone: { type: String },
  address: { type: String, required: [true, "Address is required"] },
  ratings: { type: float },
});

const workshopModel = moongoose.model("Workshop", workshopSchema);

module.exports = workshopModel;
