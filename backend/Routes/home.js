const jwt = require('jsonwebtoken');

const secretKey =process.env.JWT_SECRET_KEY

const User = require('../model/userModel');

async function home(req,res){
  try{
      return res.status(200).json({ message: 'Success','username':req.user.username});
  }catch(err){
    return res.status(400).json({message:err.message})
  }
}

module.exports=home;