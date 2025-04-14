const User = require("./user/user.model");
const Vehicle = require("./user/vehicle.model");
const Repair = require("./workshop/repair.model");
const AdminUser = require("./admin/adminUser.model");
const Workshop = require("./workshop/workshop.model");
const Bill = require("./workshop/bill.model");

module.exports = { User, Vehicle, Repair, AdminUser, Workshop, Bill };
