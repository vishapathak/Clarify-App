const express = require('express')
const Authorization = require('../../Middlewares/Authorization')
const Auth = require('../../Controller/userController')

const router = express.Router();


router.post('/auth/register', Auth.register)
router.post('/auth/login', Auth.login)
router.get('/user', Authorization.verifyToken, Auth.getUser)
router.put('/user', Authorization.verifyToken, Auth.updateUser)

module.exports = router