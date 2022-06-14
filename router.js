const express =require('express');
const router =express.Router();
const productModel =require('./models/product');



//get all product
router.get('/', async (req,res)=>{
    try{
        const allproducts =await productModel.find();
        res.status(200).json(allproducts);

    }catch(e){
        res.status(500).json({error:e.message})
    }
 
})


//create product
router.post('/createproduct', async (req,res)=>{
    const getproductfrombody =req.body;
    try{
       const newproduct =await productModel.create(getproductfrombody);
         res.status(201).send(newproduct);
    }catch(e){
        res.status(400).json({error:e.message});
    }

})


//get product product by id
//delete product by id
//patch product by id
router.route('/:id')
.get( getproductbyid,(req,res)=>{
    
        res.status(202).json(res.foundproduct);
})
.delete(getproductbyid, async (req,res)=>{

    try{
       res.foundproduct.remove();
       res.json({message:"product is deleted"});
    }catch(e){
        res.status(500).json({message:e.message});
    }

})
.patch(getproductbyid,async(req,res)=>{
    if(req.body.name!=null){
       res.foundproduct.name=req.body.name; 
    }
    if(req.body.description!=null){
        res.foundproduct.description =req.body.description;
    }
    if(req.body.stock!=null){
        res.foundproduct.stock=req.body.stock;
    }
    if(req.body.price!=null){
        res.foundproduct.price=req.body.price;
    }
    try{ 
        
        const updatedproduct =await res.foundproduct.save();
        res.json(updatedproduct);

    }catch(e){
        res.status(400).json({message:e.message});
    }
})




//middleware to get the product with id 
//and assign it to res object
//so we can use in the above

async function getproductbyid (req,res,next){
    let foundproduct;
    try{
        try{
            foundproduct = await productModel.findById(req.params.id);
        }catch(e){
            res.status(404).json({message:"the product not found"});
        }
    }catch(e){
        res.status(500).json({message:e.message});
    }

    res.foundproduct =foundproduct;
    next();
}

module.exports =router;