const { createCategoryController,updateCategoryController, categoryController, singleCategoryController,deleteCategoryController } = require('../controllers/categoryController')
const { isAdmin, requireSignIn } = require('../middleware/authMiddleware')

const express = require('express');
const router = express.Router()

router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

router.get('/get_category',categoryController)

router.get('/single-category/:slug',singleCategoryController)

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

module.exports = router