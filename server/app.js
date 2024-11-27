const express = require('express')
const app=express()
const mongoose=require('mongoose')
const PORT=5000
const {MONGOURI}=require('./keys')

mongoose.connect(MONGOURI) 
mongoose.connection.on('connected',()=>{
    console.log("connected yeahh")
})

mongoose.connection.on('error',(err)=>{
    console.log("error naah",err)
})

require('./models/user')
require('./models/posts')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})