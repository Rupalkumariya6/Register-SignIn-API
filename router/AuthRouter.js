const express = require('express')
const router = express.Router();
const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {

    const { firstName, lastName, age, email, password, dateOfBirth, gender, hobbies, address, city, pincode } = req.body

    try {
        //existing user
        const existingUser = await user.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        //hashed password
        const hashedPassword = await bcrypt.hash(password, 10)

        //create user
        const createUser = await user.create({
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            password: hashedPassword,
            dateOfBirth: dateOfBirth,
            gender: gender,
            hobbies: hobbies,
            address: address,
            city: city,
            pincode: pincode,
        })

        //token generation
        const token = jwt.sign({ email: createUser.email, id: createUser.id }, SECRET_KEY)
        res.status(201).json({ user: createUser, token: token })


    } catch (error) {
        res.status(500).json({ message: "Register Api not working" })
    }
})

router.post('/signin', async (req, res) => {

    const { email, password } = req.body
    try {
        const existingUser = await user.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password)

        if (!matchPassword) {
            return res.status(400).json({ message: "Inavlid Credentials" })
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, SECRET_KEY)
        res.status(201).json({ user: existingUser, token: token })

    } catch (error) {
        res.status(500).json({ message: "Signin Api not working" })
    }


})

module.exports = router


