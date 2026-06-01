const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register a user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide name, email and password" });
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        address
    });

    if (user) {
        res.status(201).json({ _id: user.id, name: user.name, email: user.email });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc Login a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable && (await bcrypt.compare(password, userAvailable.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    name: userAvailable.name,
                    email: userAvailable.email,
                    id: userAvailable.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
});

// @desc Get current user
// @route GET /api/users/current
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// @desc Logout user
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = { registerUser, loginUser, getCurrentUser, logoutUser };