const express = require('express')
const { handleUserSignup, handleUserLogin } = require('../controllers/user')
const userRoute = express. Router()

userRoute.post('/login', handleUserLogin)
userRoute.post('/', handleUserSignup )

module.exports = userRoute