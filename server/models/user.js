const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String, required:true
    },
    email:{
        type:String, required:true
    },
    password:{
        type:String, required:true
    },
    pic:{
        type:String
    },
    followers:[{
        type:ObjectId, ref:"User"
    }],
    following:[{
        type:ObjectId, ref:"User"
    }],
    stories:[{
        user:{type:ObjectId, ref:"User"},
        storyPic:String,
        storyDate:Date
    }],
    resetToken:String,
    expireToken:String
},{timestamps:true})

const User = mongoose.model("User",userSchema) 
module.exports = User