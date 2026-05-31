const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"]
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"]
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
        enum: ["Protection", "Karate", "Thai/Kickbox", "Gi/Judo"]
    },
    imageUrl: {
        type: String,
    },
    sizes: {
        type: [String],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);