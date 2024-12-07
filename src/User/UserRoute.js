const express = require("express");
const { UsersData, allUsers, deleteUser } = require("./UsersController");
const { authenticateToken } = require("../middlewares/authenticate");

const userRoutes = express.Router();

// User routes
userRoutes.get("/userdata", authenticateToken, UsersData);
userRoutes.get("/alluser", allUsers);
userRoutes.delete("/user/:id", deleteUser);
userRoutes.get("/user/:userId", authenticateToken, async (req, res) => {
  const user = await User.findById(req.params.userId); // Use the userId from the token or request

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ userId: user._id, email: user.email, role: user.role });
});
module.exports = userRoutes;
