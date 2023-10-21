const Product = require("../models/Product");

const getProducts = async (req, res) => {
    try {
        const apis = await Product.find({});
        return res.send(
            apis
        );
    } catch (error) {
    }
};

const getDetail = async (req, res) => {
  try{
    const api = await Product.find({});
    const apis = api.find(item=> item.id===req.params.id);
    return res.send(
        apis
    );
  }catch(error){
    console.log(error);
  }
}

const searchProduct = async (req,res)=>{
  const keysearch = req.params.keysearch;
  const product = await Product.find( { name : { $regex: keysearch, $options: 'i' } } );
  console.log(product)
  return res.json({
    metadata: product
  });
}
module.exports = 
{
  getProducts, getDetail,searchProduct
};

