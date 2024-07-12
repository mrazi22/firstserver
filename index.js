const express = require("express");
const Studentroutes = require('./routes/studentRoutes')
const userRouters = require('./routes/userRoutes')
const app = express();

require('dotenv').config()
require('./helpers/init_mongodb')

app.use(express.json())
app.use(Studentroutes)
app.use(userRouters)

app.use((error,req,res,next) => {    //error handler for all routes 
    res.status(error.status || 500)
    res.send({
        status:error.status || 500,
        message:error.message
    })
})






app.listen(3000,() => {
    console.log("server is running on port http://localhost:3000");
})