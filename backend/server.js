require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("./models/User")
const Post = require("./models/Post")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

function auth (req, res, next) {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ msg: "No token" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.id
    next()
  } catch {
    res.status(401).json({ msg: "Invalid token" })
  }
}


app.post("/auth/signup", async (req, res) => {
	try {
    const { username, password } = req.body

    const exists = await User.findOne({ username })
    if (exists)
      return res.status(400).json({ msg: "User already exists" })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hashed })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ token })
  } catch {
    res.status(500).json({ msg: "Signup failed" })
  }
})

app.post("/auth/login", async (req, res) => {
	try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user)
      return res.status(400).json({ msg: "Invalid credentials" })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok)
      return res.status(400).json({ msg: "Invalid credentials" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch {
    res.status(500).json({ msg: "Login failed" })
  }
})

// Public – show all posts
app.get("/posts/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 })
  res.json(posts)
})

// Private – create post (40 words max)
app.post("/posts/", auth, async (req, res) => {
  const words = req.body.text.trim().split(/\s+/)
  if (words.length > 40)
    return res.status(400).json({ msg: "Max 40 words" })

  const post = await Post.create({
    text: req.body.text,
    user: req.user
  })

  res.json(post)
})

app.listen(5000, () => console.log("Server running on 5000"))
