const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})

const categoryCollection = new mongoose.model('category',categorySchema)

module.exports = {categoryCollection}