const express = require("express");
const routes = express.Router();
const userController = require('../controllers/userControler')
const {verifyAccessToken} = require('../helpers/jwthelpers')
const { signAcessToken}  = require('../helpers/jwthelpers')


routes.post('/register',userController.Register),
routes.post('/login',userController.login)


module.exports = routes