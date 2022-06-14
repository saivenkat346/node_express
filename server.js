const mongoose =require('mongoose');
const express =require('express');

const app=express();

app.use(express.json());


app.listen(3000,()=>{
  console.log("server is running on port 3000");
});

mongoose.connect('mongodb://localhost/productdb',()=>{
    console.log("database is connected");
});





const newRouter =require('./router');

app.use('/product',newRouter);