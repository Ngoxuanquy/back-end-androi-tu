const mongoose = require('mongoose');

const CartChema = new mongoose.Schema(
    {
        userid: {
            type: String
        },
        productId: {
            type: String
        },
        img:
        {
            type: String
        },
        nameproduct: {
            type: String
        },
        
        quantity: {
            type: Number
        },
        price: {
            type: Number
        },
        status: {
            type: Boolean,
            default: false
        }
    }, {
    timestamps: true
})

module.exports = mongoose.model("Cart", CartChema)