const joi = require('joi')

const authSchema = joi.object({

    email: joi.string().email().required().lowercase(),
    password: joi.string().required().min(6)

})

module.exports = {authSchema} //when exporting schemas we need to use curly braces

//validating email and password with joi