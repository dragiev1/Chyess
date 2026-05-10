const express = require("express")
const router = express.Router()
const User = require("../models/user")

router

.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.send(users)
  } catch (err) {
    res.status(401).send({message: err.message})
  }
})

.post('/login', async (req, res) => {
  try {
    const user = await User.login(req.body)
    res.send({...user, password: undefined})
  } catch (err) {
    res.status(401).send({message: err.message})
  }
})

.post('/register', async (req, res) => {
  try {
    const user = await User.register(req.body)
    res.send({...user, password: undefined})
  } catch (err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router