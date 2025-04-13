const jwt = require('jsonwebtoken')

const User = require('../models/userModel');

const protected = async (req, res, next) => {
   let token;

   if(
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
   ){
      try {
         token = req.headers.authorization.split(' ')[1];
         const decode = jwt.verify(token, process.env.JWT_SECRET);
            //console.log("Token received:", token);
            //console.log("Decoded token:", decode);
         req.user = await User.findById(decode.id).select("-password");

         next();

      } catch (error) {
         console.log("JWT verify failed", error);
         //console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
         return res.status(401).json({
            message:'Not authorized, token failed',
            success: false
         })
      }
   }

   if(!token) {
      res.status(401).json({
         message: 'Not authorized, no token',
         success: false
      })
   }
}

module.exports = {protected};