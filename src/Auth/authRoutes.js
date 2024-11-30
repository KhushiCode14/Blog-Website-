const express = require("express");
// const registerController = require("./authController");
const { registerController, loginController } = require("./authController");

const authRoute = express.Router();

// Middleware to parse JSON request bodies

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
module.exports = authRoute;
