const CartService = require('../Service/CartService')

class CartController {
    static async addToCart(req, res, next) {
        return {
            message: 'Create new Cart success',
            metadata: await CartService.createUserCart(req.body),
        }
    }

}

module.exports = CartController
