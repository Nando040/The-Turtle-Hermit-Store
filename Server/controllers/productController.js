const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc Get all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
});

// @desc Get single product
// @route GET /api/products/:id
// @access Public
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
});

// @desc Get products by category
// @route GET /api/products/category/:category
// @access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
});

// @desc Create product
// @route POST /api/products
// @access Private
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, imageUrl, sizes } = req.body;

    if (!name || !description || !price || !category) {
        return res.status(400).json({ message: "Please provide name, description, price and category" });
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        imageUrl,
        sizes
    });

    res.status(201).json(product);
});

// @desc Update product
// @route PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedProduct);
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = { getProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct };