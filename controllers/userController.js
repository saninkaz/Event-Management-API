const jwt = require("jsonwebtoken")
const validator = require("validator");
const { userModel } = require("../models/userModel");

//Register a User

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ message: "User already exists" })
        }

        if (password.length < 8) {
            return res.json({ message: "Use a Strong Password" })
        }

        const User = await userModel.create(req.body);

        const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRESIN })

        res.json({ success: true, token });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error Occurred" })
    }


}

//Login a User

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        if (!email || !password || !validator.isEmail(email) || password.length < 8) {
            return res.json({ message: "Enter a valid email or password" })
        }

        const exist = await userModel.findOne({ email });
        if (!exist) {
            return res.json({ message: "The user does not exist" })
        }

        const check = await exist.comparepassword(password, exist.password)

        if (!check) {
            return res.json({ message: "The password does not match" })
        }

        const token = jwt.sign({ id: exist.id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRESIN })

        res.json(
            {
                success: true, token: token, message: "User sucessfully logged in"
            }
        )
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error Occurred" })
    }



}

module.exports = { addUser, loginUser }

