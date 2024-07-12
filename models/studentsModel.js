const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: {type: String, required: [true, "First name is required"]},
    lastName: {type: String, required: [true, "Last name is required"]},
    Gender: {type: String, required: [true, "Gender is required"]}
});

const student = mongoose.model("student", studentSchema);
module.exports = student