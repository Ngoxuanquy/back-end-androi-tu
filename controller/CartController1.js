const CartChema = require("../models/Cart");

const getListToCart = async (req, res) => {
  try {
    const userId = req.params.id; // Get the userid from the request parameters
    const itemsForUser = await CartChema.find({ 
      userid: userId,
      status: false
     });
    return res.send(itemsForUser);
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
}

const getListToCartByTT = async (req, res) => {
  try {
    const userId = req.params.id; // Get the userid from the request parameters
    const itemsForUser = await CartChema.find({ 
      userid: userId,
      status: true
     });

    return res.send(itemsForUser);
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
}

const ThanhToan = async (req, res) => {
  try {
    const payload = req.body.product; // Get the entire request body

    // Assuming payload is an array of objects, loop through each object
    for (const product of payload) {
      const { userid, productId } = product;


      const itemsForUser = await CartChema.updateOne(
        {
          userid: userid,
          productId: productId,
          status: false
        },
        { $set: { status: true } }
      );
      console.log({itemsForUser})
    }


    return res.send('Update successful'); // Sending a response after processing all items
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
}


const  createUserCart = async (req, res) => {
    try {
       const payload = req.body;
        console.log(payload)

        const existingCartItem = await CartChema.findOne({ 
            productId: payload.productId,
            userid: payload.userid,
            status: false
         });
        
        if (existingCartItem ) {
            console.log("đã có")
            // Mặt hàng đã tồn tại trong giỏ hàng, nên tăng số lượng
            existingCartItem.quantity += 1;
            existingCartItem.total = existingCartItem.price * existingCartItem.quantity;
            const updatedCartItem = await existingCartItem.save();


            return res.json(
              {
                mes: 'Cập nhật giỏ hàng thành công',
                metadata: updatedCartItem
            }
            );
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
            console.log({result})
            return res.json({
                mes: 'Thêm giỏ hàng thành công',
                metadata: result
            });
        }
    } catch (error) {
        console.error("Lỗi ", error);
    }
  }

const putToCart = async (req, res) => {
  const id = req.params.id;
  const newQuantity = req.body.newQuantity;
  await CartChema.updateOne({ _id: id }, {
    $set: { quantity: newQuantity}
  }).then(() => {
    console.log(newQuantity);
    res.json('Thành công');
  }).catch(() => {
    res.status(500).json('Lỗi máy chủ nội bộ');
  })
}
const deleteToCart = async (req, res) => {
  const id = req.params.id;
  await CartChema.deleteMany({ _id: id })
    .then(() => {
      res.json('Thành công');
    }).catch(() => {
      res.status(500).json('Lỗi máy chủ nội bộ');
    })
}

module.exports = { getListToCart, putToCart, deleteToCart , ThanhToan,getListToCartByTT, createUserCart}