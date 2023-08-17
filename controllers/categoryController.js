const async = require('hbs/lib/async')
const {categoryCollection} = require('../models/CategoryModel')
const slugify = require('slugify')

exports.createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            req.status(401).send({
                message:'Name is required'
            })
        }
         const existingCategory = await categoryCollection.findOne({name})
         if(existingCategory){
            return res.status(200).send({
                message:'Category already exists'
            })
         }  
         const category = await new categoryCollection({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"New category created",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in category',
            error
        })
    }
}


exports.updateCategoryController = async(req,res)=>{
    try {
        const {name}= req.body
        const {id} = req.params
        const category = await categoryCollection.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while updating category"
        })
    }
}


exports.categoryController = async(req,res)=>{
    try {
        const category = await categoryCollection.find({})
        res.status(200).send({
            success:true,
            message:'All categories listed',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while getting all categories'
        })
    }
}



exports.singleCategoryController = async(req,res)=>{
    try {
        const category = await categoryCollection.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while getting single category',
            error
        })
    }
}

exports.deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        await categoryCollection.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'category deleted',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error deleting',
            error
        })
    }
}