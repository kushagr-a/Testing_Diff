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

    if (user.password === password) {

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "secret123"
        )

        res.json({
            message: "login success",
            token: token
        })

    } else {
        res.send("wrong password")
    }

})

app.get("/users", async (req, res) => {

    const users = await User.find()

    res.json(users)

})

app.post("/register", async (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        role: "user"
    })

    await user.save()

    res.send("user created")

})

app.listen(3000, () => {
    console.log("server started")
})