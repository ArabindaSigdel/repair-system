// models/index.js
const User = require("./user.model");
const Vehicle = require("./vehicle.model");
const Repair = require("./repair.model");
const AdminUser = require("./adminUser.model");

module.exports = { User, Vehicle, Repair, AdminUser };
