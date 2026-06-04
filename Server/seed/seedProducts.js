const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('../config/dbConnection');
const Product = require('../models/productModel');
const products = require('../data/products');

dotenv.config();

const seedProducts = async () => {
    try {
        await connectDB();
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("Products seeded successfully");
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error(error);

        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }

        process.exit(1);
    }
};

seedProducts();
