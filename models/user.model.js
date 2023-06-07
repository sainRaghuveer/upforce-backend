const mongoose = require("mongoose");


//Creating user schema using mongoose
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
    },
    status:{
        type:String,
        default:"active"
    },
    profile:{
        type:String,
        default:"https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg"
    },
    location:{
        type:String,
    }
}, {timestamps:true});


//Creating userModel using mongoose
const userModel = mongoose.model("user", userSchema);


module.exports={
    userModel
}