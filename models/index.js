const User = require("./user/user.model");
const Vehicle = require("./user/vehicle.model");
const Repair = require("./workshop/repairCard.model");
const AdminUser = require("./admin/adminUser.model");
const Workshop = require("./workshop/workshop.model");
const Inventory = require("./workshop/inventory.model");

module.exports = { User, Vehicle, Repair, AdminUser, Workshop, Inventory };
