const express = require('express')

const { loginuser, signupuser } = require('../controller/userController')

const router = express.Router()

router.post('/login',loginuser)

router.post('/signup',signupuser)

module.exports = router