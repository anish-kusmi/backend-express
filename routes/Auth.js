const express = require('express')
const User = require('../models/User')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult}= require('express-validator')
// require('dotenv').config();
const dotenv= require('dotenv');
const fecthUser = require('../middleware/Fecthuser')
dotenv.config();


const router = express.Router()
// const JWT_SECRET = "heisagoodboy"
const jwtSecret = process.env.JWT_SECRET;
console.log("Your JWT secret is:", jwtSecret);

//create user API
router.post(
    "/createuser",
    [
      body("name").isLength({ min: 3 }),
      body("email").isEmail(),
      body("password").isLength({ min: 5 }),
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
            id:user._id,
           }
            
        }
        const authToken= jwt.sign(data, jwtSecret);
        // console.log(authToken);
        res.json({user,authToken});
        
    } catch (error) {
        res.status(500).send("internal server error");
    }
});


// Login API
router.post(
    "/login",
    [body("email").isEmail(), body("password").isLength({ min: 8 })],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: "pls regsiter your email first" });
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
          return res.status(400).json({ error: "password doesn't match" });
        }
        const data = {
          user: {
            id: user._id,
          },
        };
        const authToken = jwt.sign(data, jwtSecret);
        // console.log(authToken);
        res.json({ user, authToken });
      } catch (error) {
        res.status(500).send("internal server error");
      }
    }
  );


//get user API 
router.get("/getuser", fecthUser, async(req,res)=>{
    try{
        const userId= req.user.id;
        console.log("User ID :",userId);
        
        const user= await User.findById(userId).select ("-password");
        res.json(user);
    } catch(error){
        res.status(500)  ("internal server error");
    }
});

module.exports= router;