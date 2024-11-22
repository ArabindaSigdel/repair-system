const userRegister = require("./controllers/userRegister");
const express = require("express");

const userRouter = express.Router();
userRouter.post("/registerUser", userRegister);

module.exports = userRouter;
