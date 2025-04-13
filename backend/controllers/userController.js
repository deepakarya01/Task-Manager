const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/taskRoute');

const register = async (req, res) => {
   const {name, email, password} = req.body;
   
   try {
      if(!name || !email || !password){
         return res.status(400).json({message: "All fileds are mandatory.", success: false})
      };
      
      const isExisting = await User.findOne({email});
      
      if(isExisting){
         return res.status(400).json({message: "User already exists", success: false})
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await User.create({
         name,
         email,
         password:hashedPassword,
      });

      const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

      res.status(201).json({
         message: "User created successfully",
         success: true,
         user: {
            _id:newUser._id,
            name:newUser.name,
            email: newUser.email
         },
         token
      });
   } catch (error) {
      console.log("Error in register", error);
      res.status(500).json({message: "Server error. PLease try again.", success: false});   
   }
}

const login = async (req, res) => {
   const {email, password} = req.body;

   try {
      if(!email || !password){
         return res.status(400).json({
            message: "All fields are mandotory.",
            success: false
         })
      }
      const user = await User.findOne({email});

      if(!user){
         return res.status(404).json({
            message: "No user found",
            success: false
         })
      }

      const isPassword = await bcrypt.compare(password, user.password);

      if(!isPassword){
         return res.status(400).json({message: "Invalid credentials", success: false})
      }

      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

      res.status(200).json({
         message: "User logged in successfully.",
         success: true,
         user: {
            _id: user._id,
            name: user.name,
            email:user.email,
         },
         token,
      });
   } catch (error) {
      console.log("Error in login", error);
      res.status(500).json({message: "Server error", error});
   }
}

module.exports = {register, login};