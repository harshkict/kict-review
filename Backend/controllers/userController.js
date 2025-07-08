// Import required modules
const express = require("express");
const User = require("../models/userModel"); // Adjust the path to your User model

// Controller functions
const userController = {
    // Add a new user
    addUser: async (req, res) => {
        const { UserName, Password } = req.body;

        try {
            const newUser = new User({
                UserName,
                Password,
            });

            await newUser.save();
            res.status(201).json({ message: "User created successfully", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error fetching users", error });
        }
    },

    // Update a user
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { UserName, Password } = req.body;

        try {
            const updateData = {
                ...(UserName && { UserName }),
                ...(Password && { Password }),
            };

            const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ message: "User updated successfully", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ message: "User deleted successfully", user: deletedUser });
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    },

    // User login
    loginUser: async (req, res) => {
        const { UserName, Password } = req.body;

        try {
            const user = await User.findOne({ UserName });

            if (!user || user.Password !== Password) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            res.status(200).json({ message: "Login successful", user });
        } catch (error) {
            res.status(500).json({ message: "Error logging in", error });
        }
    },
};

module.exports = userController;