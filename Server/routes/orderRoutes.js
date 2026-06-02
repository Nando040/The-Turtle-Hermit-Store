const express = require("express");
const { createOrder, getUserOrders, getOrderById } = require("../controllers/orderController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// POST är publik (gäster kan beställa), GET-routes kräver inloggning
router.route("/").post(createOrder).get(validateToken, getUserOrders);
router.route("/:id").get(validateToken, getOrderById);

module.exports = router;