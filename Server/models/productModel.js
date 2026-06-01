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
        enum: ["Protection", "Karate", "Thai/Kickbox", "BJJ/Judo"]
    },
    imageUrl: {
        type: String,
    },
    sizes: {
        type: [String],
    },
    categorySlug: {
        type: String,
    }
}, {
    timestamps: true
});

productSchema.pre("save", async function() {
    this.categorySlug = this.category
        .toLowerCase()
        .replace(/\//g, "-")
        .replace(/\s+/g, "-");
});

module.exports = mongoose.model("Product", productSchema);