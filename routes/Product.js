const express= require('express');
const{body, validationResult}=require('express-validator');
const Product = require('../models/Product');
const fecthUser = require('../middleware/Fecthuser');


router=express.Router()

//Get (getallproduct) API
router.get('/getallproduct', fecthUser,async(req,res)=>{
    try {
       const products= await Product.find({user: req.user.id})
       res.json(products)
    } catch (error) {
        res.status(500).send("internal server error");
    }
});



//POST (addproduct) API
router.post('/addproduct', fecthUser
    ,[
body('title').isLength({min:3}),
body('description').isLength({min:5}),
],
async(req,res)=>{
  
    try {
        const{title, description, instock, price}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let images=req.files.map(el=>{
          return el.filename
        })
       
        const product= new Product({
            title,
            description,
            instock,
            price,
            images,
            user: req.user.id,
        });
        const saveProduct= await product.save();
        res.json(saveProduct)
    } catch (error) {
        res.status(500).send("internal server error",error);
    }
});
//API gethomeproduct

router.get('/gethomeproduct', async (req, res) => {
  try {
      const products = await Product.find();
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
  }
});

//PUT updateproduct API
router.put("/updateproduct/:id", fecthUser, async (req, res) => {
  const { title, description, price, instock } = req.body;
  try {
    const newProduct = {};
    if (title) {
      newProduct.title = title;
    }
    if (description) {
      newProduct.description = description;
    }
    if (price) {
      newProduct.price = price;
    }
    if (instock) {
      newProduct.instock = instock;
    }

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product not found");
    }
    if (!product.user || product.user.toString() !== req.user.id) {
      return res.status(403).send("not allowed");
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});


//DELETE (routerdelete)

router.delete('/deleteproduct/:id',fecthUser, async(req,res)=>{
    try {
       let product= await Product.findById(req.params.id)
       if(!product){
        return res.status(404).send("product not found")
       } 
       
       if( product.user.toString()!==req.user.id){
        return res.status(403).send("not allowed");

    }

    product= await Product.findByIdAndDelete(req.params.id)
    res.json(
        { message: "Product deleted" }
    );
    } catch (error) {
        res.status(500).send("internal server error",error);
    }
})
module.exports=router;