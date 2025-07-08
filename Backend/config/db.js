const mongoose = require("mongoose");

const Database_URL = "mongodb+srv://het3patel669:dhj369KICTReview@kict-review.s2vy3l1.mongodb.net/?retryWrites=true&w=majority&appName=kict-review";

mongoose.connect(Database_URL).then(()=>console.log('!!MongoDB Connected!!')).catch((err)=> console.log(err.message));
