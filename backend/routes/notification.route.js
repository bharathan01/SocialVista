const express = require('express')
const isAuthorizedUser = require('../middleware/jwtTokenVerify')
const { getNotification, deleteNotification } = require('../controllers/notification.controller.js')


const router = express.Router()

router.get('/',isAuthorizedUser,getNotification)
router.get('/delete',isAuthorizedUser,deleteNotification)


module.exports = router