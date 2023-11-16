require("dotenv/config")


const express =require("express")

const fileUpload = require('express-fileupload');

const app = express()

app.use(fileUpload()); 

app.use(express.json())

const blogWithAws = require("./Routes/route.js")
app.use("/", blogWithAws)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
  
  module.exports = app