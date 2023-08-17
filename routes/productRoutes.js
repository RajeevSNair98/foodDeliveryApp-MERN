const express = require('express')
const formidable = require('express-formidable')
const {createProductController,getProductController,getSingleProductController,
      updateProductController, productPhotoController,deleteProductController,
      productFilterController,braintreeTokenController,brainTreePaymentController} = require('../controllers/productController')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')
const braintree = require('braintree')
const router = express.Router()


router.post('/create-product',requireSignIn,isAdmin,formidable(), createProductController)

router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(), updateProductController)


router.get('/get-product',getProductController)

router.get('/get-product/:slug',getSingleProductController)

router.get('/product-photo/:pid',productPhotoController)

router.delete('/delete-product/:pid',deleteProductController)

router.post('/product-filters',productFilterController)

router.get('/braintree/token',braintreeTokenController)

router.post('/braintree/payment',requireSignIn,brainTreePaymentController)

module.exports = router