const express = require("express");

const app = express();
app.use(express.json());



app.use('/',(req,res)=>{
    res.send('everything is okkay !')
})

app.use("*",(req,res)=>{
  res.send('page not Found,!')
})

module.exports = app;
