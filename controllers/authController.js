const collection = require('../models/userModel')
const {hashPassword, comparePassword} = require('../helpers/authHelper')
const jwt = require('jsonwebtoken')
const orderCollection = require('../models/orderModel')

exports.registerController = async(req,res)=>{

    try {
        const {name,email,password,phone,address,answer} = req.body
        // Validation
        if(!name){
            return res.send({message:"Name is required"})
        }
        if(!email){
            return res.send({message:"Email is required"})
        }
        if(!password){
            return res.send({message:"Password is required"})
        }
        if(!phone){
            return res.send({message:"Phone number is required"})
        }
        if(!address){
            return res.send({message:"Address is required"})
        }
        if(!answer){
            return res.send({message:"Answer is required"})
        }


        //existing user
        const existingUser = await collection.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already registered..Please Login'
            })
        }


        //register user
        const hashedPassword = await hashPassword(password)
        const user =await new collection({name,email,phone,address,password:hashedPassword,answer}).save()

        res.status(201).send({
            success:true,
            message: "User Registered Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}


exports.loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        //check user
        const user = await collection.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not Registered"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(404).send({
                success:false,
                message:"Invalid Password"
            })
        }
        //token
        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success:false,
          message:'Error in Login',
          error  
        })
    }
}

exports.forgotPasswordController = async(req,res)=>{
    try {
        const {email,answer,newPassword} = req.body
        if(!email){
            res.status(400).send({
                message:"Email is required"
            })
        }
        if(!answer){
            res.status(400).send({
                message:"Answer is required"
            })
        }
        if(!newPassword){
            res.status(400).send({
                message:"New Password is required"
            })
        }

        const user = await collection.findOne({email,answer})

        if(!user){
            res.status(404).send({
                success:false,
                message:"Wrong email or address"
            })
        }

        const hashed = await hashPassword(newPassword)
        await collection.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"Password changed successfully "
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }
}

exports.testController = (req,res)=>{
    res.send("Protected Route");
}


exports.updateProfileController = async (req, res) => {
    try {
      const { name, password, address, phone } = req.body;
      const user = await collection.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await collection.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };


  exports.getOrdersController = async(req,res)=>{
    try {
        const orders = await orderCollection
        .find({buyer:req.user._id})
        .populate("products", "-photo")
        .populate("buyer", "name")
      res.json(orders);        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting orders",
            error
        })
    }
  }


  exports.getAllOrdersController = async(req,res)=>{
    try {
        const orders = await orderCollection
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({createdAt:'-1'})
      res.json(orders);        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting orders",
            error
        })
    }
  }


  exports.orderStatusController = async(req,res)=>{
    try {
        const {orderId} = req.params
        const {status} = req.body

        const orders = await orderCollection.findByIdAndUpdate(orderId,{status},{new:true})
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while updating order'
        })
    }
  }