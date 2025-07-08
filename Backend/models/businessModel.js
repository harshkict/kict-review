const mongoose = require("mongoose");

const businessModel = new mongoose.Schema({
    BusinessId: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    },
    Review:[{
        Description:{
            type:String,
        },
        Status:{
            type:String,
        }
    }]
});

const Business = mongoose.model("Business", businessModel);
module.exports = Business;