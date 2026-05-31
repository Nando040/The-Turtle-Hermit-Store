const express = require("express");
const { createOrder, getUserOrders, getOrderById } = require("../controllers/orderController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// Alla order-routes är Private
router.use(validateToken);

router.route("/").post(createOrder).get(getUserOrders);
router.route("/:id").get(getOrderById);

module.exports = router;