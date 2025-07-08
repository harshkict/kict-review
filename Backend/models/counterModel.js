const mongoose = require("mongoose");

const counterModel = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Count:{
        type:Number,
        default:0
    }
});

const Counter = mongoose.model("Counter", counterModel);
module.exports = Counter;