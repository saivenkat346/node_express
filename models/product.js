const mongoose =require('mongoose');


const productSchema=mongoose.Schema({
    name:String,
    description:String,
    stock:Number,
    price:Number
})


module.exports=mongoose.model("product",productSchema);