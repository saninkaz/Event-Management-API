const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail.js");
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter a username"]
    },
    email: {
        type: String,
        required: [true, "Please Enter an Email"],
        unique: true,
        validate: [validator.isEmail, 'Enter a valid Email']
    },
    password: {
        type: String,
        required: [true, "Please Enter a Password"],
    },
    department:{
        type:String
    },
    year:{
        type:Number
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: [true, "Please specify a role"],
        default:"user"
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparepassword = async (passw, passwdb) => {
    return await bcrypt.compare(passw, passwdb);
}

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

module.exports = { userModel }