const express = require('express')
const { register, login,refreshToken, resetPassword, newPassword } = require('../../controllers/authController')//import register
const authRouter = express.Router()


authRouter.post('/signup',register)
authRouter.post('/signin',login)
authRouter.post('/reset-passsword',resetPassword)
authRouter.post('/new-password',newPassword)

authRouter.post('/refresh_token',refreshToken)





module.exports = authRouter