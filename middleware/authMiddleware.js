const jwt = require('jsonwebtoken')
const collection = require('../models/userModel')

//Protected Routes token base
exports.requireSignIn = async (req, res, next) => {
    try {
      const decode = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };

exports.isAdmin = async(req,res,next)=>{
    try {
        const user = await collection.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized Access"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
    }
}