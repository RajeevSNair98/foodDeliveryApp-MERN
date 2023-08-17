const {productCollection} = require('../models/productModel')
const {categoryCollection} = require('../models/CategoryModel')
const orderCollection = require('../models/orderModel')
const fs = require('fs')
const mongoose = require('mongoose')
const slugify = require('slugify')
const braintree = require('braintree')
const dotenv = require('dotenv')

dotenv.config()



var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });



exports.createProductController = async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})    
            case !price:
                 return res.status(500).send({error:'price is required'})    
            case !category:
                 return res.status(500).send({error:'category is required'})    
            case !quantity:
                return res.status(500).send({error:'quantity is required'})    
            case photo && photo.size > 1000000:
                return res.status(500).send({error:'Photo is required and should be less than 1mb'})                         
            }

            const products = productCollection({...req.fields,slug:slugify(name)})
            if(photo){
                products.photo.data = fs.readFileSync(photo.path)
                products.photo.contentType = photo.type
            }
            await products.save()
            res.status(201).send({
                success:true,
                message:"Product created successfully"
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in creating product'
        })
    }
}



exports.getProductController = async(req,res)=>{
    try {
        const products = await productCollection.find({}).populate('category').select('-photo').limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:'All products',
            products,
            total:products.length
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error getting products',
            error
        })
    }
}


exports.getSingleProductController = async(req,res)=>{
    try {
        const product = await productCollection.findOne({slug:req.params.slug}).select('-photo').populate('category')
        res.status(200).send({
            success:true,
            message:'Got single product',
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
        message:'Error getting single product'
        })
    }
}


exports.productPhotoController = async(req,res)=>{
    try {
        const product = await productCollection.findById(req.params.pid).select('photo')
        if(product.photo.data){
            res.set(`Content-type`,product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error getting photo'
        })
    }
}

exports.deleteProductController = async(req,res)=>{
    try {

        await productCollection.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success:true,
            message:'Product deleted successfully'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while deleting'
        })
    }
}

exports.updateProductController = async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})    
            case !price:
                 return res.status(500).send({error:'price is required'})    
            case !category:
                 return res.status(500).send({error:'category is required'})    
            case !quantity:
                return res.status(500).send({error:'quantity is required'})    
            case photo && photo.size > 1000000:
                return res.status(500).send({error:'Photo is required and should be less than 1mb'})                         
            }

            const products = await productCollection.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
            if(photo){
                products.photo.data = fs.readFileSync(photo.path)
                products.photo.contentType = photo.type
            }
            await products.save()
            res.status(201).send({
                success:true,
                message:"Product updated successfully"
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in updating product'
        })
    }
}


exports.productFilterController = async(req,res)=>{
    try {
        const {checked,radio} = req.body
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte:radio[0],$lte:radio[1]}
        
        const products = await productCollection.find(args)
        res.status(200).send({
            success:true,
            products
        })


    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error filtering',
            error
        })
    }
}


exports.braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  //payment
  exports.brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderCollection({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };