const express = require("express");
const routes = express.Router();
const studentController = require('../controllers/studentControllers')
const {verifyAccessToken} = require('../helpers/jwthelpers')

routes.post('/addStudent',verifyAccessToken,studentController.addStudent)
routes.get('/getAllStudent',verifyAccessToken,studentController.getAllStudents)
routes.patch('/updateStudent',verifyAccessToken,studentController.updateStudent)
routes.post('/deleteStudent',verifyAccessToken,studentController.deleteStudent)






module.exports = routes