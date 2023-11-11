


const mongoose = require("mongoose")

const AuthSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    passward:{
        type:String,
        required:true
    },

profilePic:{

    filename:{
        type:String,
        required:true
    },

    url:{
        type:String,
        required:true
    }
}


},
{timestamps:true})


module.exports = mongoose.model("profile", AuthSchema)



