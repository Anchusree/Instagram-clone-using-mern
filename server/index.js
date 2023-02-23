const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const env = require('dotenv')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth/auth')//import authrouter
const postRouter = require('./routes/posts/posts')//import postrouter
const userRouter = require('./routes/user/user')//import user router
mongoose.set('strictQuery', false)

env.config()

app.use(cors())
app.use(express.json())
//call the routes here
app.use('/api',authRouter)
app.use('/api',postRouter)
app.use('/api',userRouter)

app.listen(port,()=>{
console.log(`Server running on ${port}`);

mongoose.connect(process.env.MONGOURI);
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo');
})
mongoose.connection.on("error",(err)=>{
    console.log("Not connected to mongo",err);
})
})