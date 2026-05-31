const express = require("express");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);

// POST /api/users/login
router.post("/login", loginUser);

// GET /api/users/current
router.get("/current", validateToken, getCurrentUser);

module.exports = router;