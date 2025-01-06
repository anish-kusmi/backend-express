const express = require('express')
const User = require('../models/User')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult}= require('express-validator')
// require('dotenv').config();
const dotenv= require('dotenv');
dotenv.config();


const router = express.Router()
// const JWT_SECRET = "heisagoodboy"
const jwtSecret = process.env.JWT_SECRET;
console.log("Your JWT secret is:", jwtSecret);
router.post(
    "/createuser",
    [
      body("name").isLength({ min: 3 }),
      body("email").isEmail(),
      body("password").isLength({ min: 8 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    try {
        let user= await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json ({error: "user already exist with this email"});
        }
        const salt= await bcrypt.genSalt(10)
        secPass= await bcrypt.hash(req.body.password, salt)
        user= await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data={
           user:{
            id:user.id,
           }
            
        }
        const authToken= jwt.sign(data, jwtSecret);
        console.log(authToken);
        res.json({user,authToken});
        
    } catch (error) {
        res.status(500).send("internal server error");
    }
});

module.exports= router;