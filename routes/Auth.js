const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.post('/createuser', async (req, res )=>{
    try {

        //check if user already exist 
        let user= await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json ({error: "user already exist with this email"});
        }

        // create new user
        User= await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user)
        
    } catch (error) {
        res.status(500).send("internal server error");
    }
});

module.exports= router;