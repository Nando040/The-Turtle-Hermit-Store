const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// @desc Create order
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
    const { products, totalPrice, paymentMethod, shippingAddress } = req.body;

    if (!products || !totalPrice || !paymentMethod || !shippingAddress) {
        return res.status(400).json({ message: "Please provide all order details" });
    }

    const order = await Order.create({
        ...(req.user && { user_id: req.user.id }),
        products,
        totalPrice,
        paymentMethod,
        shippingAddress
    });

    res.status(201).json(order);
});

// @desc Get all orders for logged in user
// @route GET /api/orders
// @access Private
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user_id: req.user.id });
    res.status(200).json(orders);
});

// @desc Get single order
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if (order.user_id.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json(order);
});

module.exports = { createOrder, getUserOrders, getOrderById };