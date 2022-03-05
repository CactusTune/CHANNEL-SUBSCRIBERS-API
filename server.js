require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dbConnect = require('./utils/dbConnect')

dbConnect()

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('API FOR SUBSCRIBERS')
})

const subscribersRoutes = require('./routes/subscribers')
app.use('/subscribers', subscribersRoutes)

app.listen(3000, ()=> console.log('Server Started!'))

