const express = require('express')
const router = express.Router()
const {registerController,loginController,
   forgotPasswordController,testController,
   updateProfileController,getOrdersController,
   getAllOrdersController,orderStatusController} = require('../controllers/authController')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')


router.post('/register',registerController)

router.post('/login',loginController)

router.post('/forgot-password',forgotPasswordController)

router.post('/test',requireSignIn,isAdmin,testController)

router.get('/user_auth', requireSignIn,(req, res) => {
     res.status(200).send({ ok: true });
  });

  router.get('/admin_auth', requireSignIn,isAdmin,(req, res) => {
    res.status(200).send({ ok: true });
 });  

router.put('/profile',requireSignIn,updateProfileController)

router.get('/orders',requireSignIn,getOrdersController)

router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)

module.exports = router