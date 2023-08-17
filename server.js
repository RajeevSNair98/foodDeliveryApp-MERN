const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan');
const db = require('./config/db');
const cors = require('cors')
const authRoutes = require('./routes/authRoute')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')

dotenv.config()

const app = express()
const PORT =process.env.PORT


app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(cors())

db.once('open',(err)=>{
    if(err){
      console.log(err);
    }else{
      console.log('Database Connected');
    }
  })

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)

app.get('/',(req,res)=>{
    res.send("Welcome to Eccommerce App");
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`.bgYellow.black);
});