//register user to the system 

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema




const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        lowerCase:true,
        unique:true
          
    },
    password:{
        type:String,
        required:true
    }
})

//middleware for encrypting password
userSchema.pre('save',async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password,salt)
    this.password = hashedPassword
    next()
    } catch (error) {
        next(error)
        
    }
})
//middleware for compearing hashed password and plain password
userSchema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password,this.password)

        
    } catch (error) {
        throw error        
    }
}


const user = mongoose.model("user",userSchema)
module.exports = user



//tommor is test day for login and studentroutes
