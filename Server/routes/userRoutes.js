const express = require("express");
const { registerUser, loginUser, getCurrentUser, logoutUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);

// POST /api/users/login
router.post("/login", loginUser);

// GET /api/users/current
router.get("/current", validateToken, getCurrentUser);

// POST /api/users/logout
router.post("/logout", validateToken, logoutUser);

module.exports = router;