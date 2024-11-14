
const Products=require('../model/product')

async function listAll(req, res) {
  try{
  const products = await Products.find({userId:req.user._id});
  // console.log(products);
  res.status(200).send(products);
}catch(err){
  res.status(400).send(err.message);
}
};

module.exports =  listAll ;