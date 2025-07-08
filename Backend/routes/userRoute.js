// User Routes
const express = require("express");
const userController = require("./../controllers/userController"); // Adjust the path to your userController file

const router = express.Router();

router.post("/add", userController.addUser); // Add user
router.get("/all", userController.getAllUsers); // Get all users
router.put("/put/:id", userController.updateUser); // Update user by ID
router.delete("/del/:id", userController.deleteUser); // Delete user by ID
router.post("/login", userController.loginUser); // Login user

module.exports = router;
