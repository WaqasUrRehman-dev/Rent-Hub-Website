const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    profile_pic: { type: String, default: "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg" },
    address: { type: String, required: true },
    city: { type: String, required: true },
    joining: { type: Date, default: Date.now }
})

const Users = model('user', userSchema)
module.exports = Users