const mongoose = require('mongoose');

const ProductChema = new mongoose.Schema(
    {
        img: {
            type: String
        },
        name:
        {
            type: String
        },
        price: {
            type: Number
        },
        description: {
            type: String
        }
    }, {
    timestamps: true
})

module.exports = mongoose.model("Product", ProductChema)