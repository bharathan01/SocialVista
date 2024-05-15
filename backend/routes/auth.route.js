const express = require('express')
const { userLogin, userRegsitration } = require('../controllers/auth.controller.js')

const router = express.Router()

router.post("/login",userLogin)
router.post("/register",userRegsitration)

module.exports = router