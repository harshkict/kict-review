const mongoose = require("mongoose");

const Database_URL = process.env.MONGODB_URI;

mongoose.connect(Database_URL).then(()=>console.log('!!MongoDB Connected!!')).catch((err)=> console.log(err.message));
