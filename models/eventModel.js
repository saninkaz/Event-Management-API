const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail.js");
const validator=require("validator")

const studentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please Enter an Email"],
        unique: true,
        validate: [validator.isEmail, 'Enter a valid Email']
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})


const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"]
    },
    date: {
        type: String,
        required: [true, "Please enter a date"]
    },
    time: {
        type: String,
        required: [true, "Please enter a time"]
    },
    venue: {
        type: String,
        required: [true, "Please enter a venue"]
    },
    capacity: {
        type: Number,
        required: [true, "Please enter the capacity of the event"]
    },
    organizer: {
        type: String,
        required: [true, "Please enter the name of organizer"]
    },
    tags: { 
        type: Array
    },
    students: {
        type: Array, 
        default: []
    }
})

const eventModel = mongoose.models.event || mongoose.model("event", eventSchema);

module.exports = { eventModel }