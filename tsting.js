const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const app = express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/test")

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String
})

const User = mongoose.model("User", UserSchema)

app.post("/login", async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
        res.send("user not found")
    }

   