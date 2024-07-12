const { model, default: mongoose } = require('mongoose')
const Student = require('../models/studentsModel')
const student = require('../models/studentsModel')
const createError = require('http-errors')

module.exports ={

    addStudent: async(req,res) =>{
        try {
            const student = new Student(req.body)
            const result = await student.save()
            // res.send(result)
            res.send({message:"Student added successfully"})
            
        } catch (error) {
            console.log(error.message)
        }
    },
    updateStudent: async(req,res)=>{
        try {
            const id = req.params.id
            const update = req.body
            const options = {new:true}

            const result = await Student.findByIdAndUpdate(id,update,options)
            if(!result) throw createError.NotFound("Student not found")
            res.send({message:"Student updated successfully"})
            
        } catch (error) {
            console.log(error.message)
            
        }
    },
    getAllStudents: async(req,res) =>{
        await Student.find({}).then((student) => {
            res.send(student)
        })
    },
    deleteStudent: async(req,res) =>{
        try {
            const id = req.params.id
        const studentz = await Student.findByIdAndDelete(id)
        if(!studentz) throw createError.NotFound("Student not found") //404 error  handler for endpoints
        res.send({message:"Student deleted successfully"})
            
        } catch (error) {
           console.log(error)
           if (error instanceof mongoose.CastError) {
            next(createError(400,"Student not found"))
           }
            
        }
        
    }


}
