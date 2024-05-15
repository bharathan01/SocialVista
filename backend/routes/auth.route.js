const express = require('express')
const { userLogin } = require('../controllers/auth.controller.js')

const router = express.Router()

router.get("/login",userLogin)

module.exports = router