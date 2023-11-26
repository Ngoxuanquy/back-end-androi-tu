const express = require('express');
const {getProducts,getDetail,searchProduct} = require('../controller/ProductController');
const {getUser,login} = require("../controller/UserController");
const {getListToCart,putToCart,deleteToCart ,ThanhToan, getListToCartByTT,createUserCart} = require("../controller/CartController1")

const router = express.Router();

router.post('/login',login);
router.get('/getproducts',getProducts);
router.get('/getdetail/:id',getDetail);
router.post('/register',getUser);
router.post('/thanhtoan',ThanhToan);

router.post('/addtocart',createUserCart);
// router.get('/getlistcart/:userid',CartController.getListcart)
router.get('/getlisttocart/:id',getListToCart);
router.get('/getlisttocartbytt/:id',getListToCartByTT);

router.put('/updatecart/:id',putToCart);
router.delete('/deletecart/:id',deleteToCart);

router.get('/search/:keysearch',searchProduct);


module.exports = router;