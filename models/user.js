const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    address: { type: String, required: true },
    age: { type: String, required: true },
    city: { type: String, required: true },
    dateOfBirth: { type: Date, default: Date.now, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    gender: { type: String, required: true },
    hobbies: { type: Array, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    pincode: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)

