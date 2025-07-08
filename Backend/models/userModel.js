const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
});

const User = mongoose.model("User", userModel);
module.exports = User;