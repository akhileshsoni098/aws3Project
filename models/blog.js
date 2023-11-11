const mongoose = require("mongoose")




const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true
    },
   descreption:{
    type:String,
    required:true
   },
   blogImg:[{
    filename:{
        type:String
    },
    url:{
        type:String
    }
   }]


},
{timestamps:true})

module.exports = mongoose.model("AwsBlog", blogSchema)