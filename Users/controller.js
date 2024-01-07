const { sign } = require('jsonwebtoken')
const userSchema = require('./schema')
const { hash, compare } = require('bcryptjs')
require('dotenv').config()
const sendmail = require('../Utils/sendMail')

const user_profile = async (req, res) => {
    const { username } = req.query
    if (username == req.query.username) {
        try {
            const searchUser = await userSchema.findOne({ username })
            res.send(searchUser)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(404).json({ message: "User Not Found" })
    }

}

const allUsers = async (req, res) => {
    try {
        const users = await userSchema.find()
        res.send(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const signup = async (req, res) => {
    const { username, email, password, gender, address, city } = req.body
    if (username && email && password && gender, address, city) {
        try {
            const checkUser = await userSchema.exists({ email })
            if (!checkUser) {
                await userSchema.create({ username, email, gender, address, city, password: await hash(password, 12) })
                await sendmail(username, email, "Sign Up Successfully")
                res.status(201).json({ message: "User Created Succesfully" })
            } else {
                res.status(400).json({ message: "User already exist" })
            }
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(400).json({ message: "Required Field Missing" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        try {
            const checkUser = await userSchema.findOne({ email })

            if (checkUser) {
                const decryptpass = await compare(password, checkUser.password)

                if (decryptpass && email == checkUser.email) {

                    const token = sign(
                        {
                            name: checkUser.username,
                            email: checkUser.email,
                            gender: checkUser.gender,
                            address: checkUser.address,
                            city: checkUser.city
                        },

                        process.env.JWT_SECRET
                    )

                    res.json({
                        message: "Successfully Login",
                        token
                    })

                } else {
                    res.status(400).json({ message: "Incorrect email or Password" })
                }

            } else {
                res.status(400).json({ message: "Incorrect email or Password" })
            }
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(400).json({ message: "Required Field Missing" })
    }
}

const updateProfile = async (req, res) => {
    const { username, email, gender, address, city } = req.body
    try {
        const filter = { email }
        const update = { username, gender, address, city }
        const updateUser = await userSchema.findOneAndUpdate(filter, update, { new: true })
        res.status(200).json({ User: updateUser, message: "Profile Updated Successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}



module.exports = { user_profile, signup, allUsers, login, updateProfile }