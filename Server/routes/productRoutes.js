const express = require("express");
const { getProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// Public routes
router.route("/").get(getProducts);
router.route("/category/:category").get(getProductsByCategory);
router.route("/:id").get(getProduct);

// Private routes
router.route("/").post(validateToken, createProduct);
router.route("/:id").put(validateToken, updateProduct).delete(validateToken, deleteProduct);

module.exports = router;