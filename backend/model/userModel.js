const mongoose= require('mongoose');


const User =new mongoose.Schema({
    username:{type:String, required:true,unique:true},
    email:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    
},{
    collection:'VerifiedUser'
})

const UserModel=mongoose.model('UserData',User)

module.exports= UserModel;