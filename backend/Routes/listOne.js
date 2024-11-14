const User = require('../model/userModel');
const Product = require('../model/product');

async function listOne(req,res){
   
    const itemid=req.params.itemid.replace(':','')
    const product=await Product.findOne({_id:itemid})
    if(!product){
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product found',product:product});
}

module.exports=listOne;