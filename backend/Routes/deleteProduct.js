const User = require('../model/userModel');
const Product = require('../model/product');

async function deleteProduct(req,res){
   
    const itemid=req.params.itemid.replace(':','')
    await Product.deleteOne({_id:itemid})
    return res.status(200).json({ message: 'Product deleted'});
}

module.exports=deleteProduct;