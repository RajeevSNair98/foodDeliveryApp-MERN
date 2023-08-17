const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

module.exports = db