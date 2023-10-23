const CartChema = require("../models/Cart")

class CartService {
    static async createUserCart(payload) {
    try {
        console.log(payload)

        const existingCartItem = await CartChema.findOne({ 
            productId: payload.productId,
            userid: payload.userid,
            status: false
         });
        console.log(existingCartItem)
        
        if (existingCartItem ) {
            console.log("đã có")
            // Mặt hàng đã tồn tại trong giỏ hàng, nên tăng số lượng
            existingCartItem.quantity += 1;
            existingCartItem.total = existingCartItem.price * existingCartItem.quantity;
            const updatedCartItem = await existingCartItem.save();

            return {
                mes: 'Cập nhật giỏ hàng thành công',
                metadata: updatedCartItem
            };
        } else {
            
            // Mặt hàng chưa tồn tại trong giỏ hàng, nên thêm mới
            const result = await CartChema.create({
                userid: payload.userid,
                img: payload.img,
                nameproduct: payload.nameproduct,
                quantity: 1,
                price: payload.price,
                productId: payload.productId,
                status: payload.status
            });

            return {
                mes: 'Thêm giỏ hàng thành công',
                metadata: result
            };
        }
    } catch (error) {
        console.error("Lỗi ", error);
    }
}

}

module.exports = CartService
