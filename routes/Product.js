const express= require('express');
const{body, validationResult}=require('express-validator');
const Product = require('../models/Product');
const fecthUser = require('../middleware/Fetchuser');


router=express.Router()

//Get (getallproduct) API
router.get('/getallproduct', fecthUser,async(req,res)=>{
    try {
       const products= await Product.find({user: req.user.id})
       res.json(products)
    } catch (error) {
        res.status(500).send("internal server error");
    }
})

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
        const product= new Product({
            title,
            description,
            instock,
            price,
        });
        const saveProduct= await product.save();
        res.json(saveProduct)
    } catch (error) {
        res.status(500).send("internal server error",error);
    }
});
module.exports=router;