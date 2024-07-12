const createErrors = require('http-errors')
const User = require('../models/userModel')
const {authSchema} = require('../helpers/validationSchema')
const { signAcessToken } = require('../helpers/jwthelpers')
const {verifyAccessToken} = require('../helpers/jwthelpers')
const user = require('../models/userModel')


module.exports = {
    Register: async (req,res,next) =>{
        try {
            const {email,password} = req.body
            const result = await authSchema.validateAsync(req.body)
    
    
            //check if email exists
            const exists = await User.findOne({email:email})
    
            if(exists)  throw createErrors.Conflict(`${email} already exists`)
                const user = new User(result)
                 const savedUser = await user.save()
                 const accessToken = await signAcessToken(savedUser.id)
                 res.send({accessToken})
                // res.send({message:"User created successfully"})
            
        } catch (error) {
            next(error)
            
        }
       
           

      
    },

    //login
    login: async (req,res,next) =>{
        try {
            const result = await authSchema.validateAsync(req.body)
            const user  = await User.findOne({email:result.email})

            if (!user) throw createErrors.NotFound("User not registered")

                const isMatch = await user.isValidPassword(result.password)
            if (!isMatch) throw createErrors.Unauthorized("Invalid email or password")

                const accessToken = await  signAcessToken(user.id)
                res.send({accessToken})

            // res.send({message:"login success"})
        

            
        } catch (error) {
            if (error.isJoi === true) return next(createErrors.BadRequest('invalid email or password'))
            next(error)
            
        }

    }

}