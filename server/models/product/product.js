const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    productType: {
        type: String,
        required: true,
        enum: ['matte', 'polished'],
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
