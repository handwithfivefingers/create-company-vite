const express = require('express')
const { upload, requireSignin, limit } = require('@middleware')
const router = express.Router()

const LoginController = require('@controller/Authorization/login.controller')
const RegisterController = require('@controller/Authorization/register.controller')
const ForgotPasswordController = require('@controller/Authorization/forgot-password.controller')

const apiLimitRate = limit({ maxRate: 1 })

const logOut = (req, res) => {
  res.clearCookie('sessionId')
  return res.status(200).json({
    authenticate: false,
  })
}

router.post('/register', upload.none(), new RegisterController().onHandleRegister)

router.post('/register-otp', apiLimitRate, new RegisterController().onHandleGetRegisterOtp)

router.post('/login-otp', apiLimitRate, new LoginController().onHandleGetOTPForLogin)

router.post('/login', new LoginController().onHandleLogin)

router.post('/login-admin', upload.none(), new LoginController().onLoginAsAdmin)

router.post('/auth', requireSignin, new LoginController().onHandleVerifyToken)

router.post('/check-user', new LoginController().onCheckUserExist)

router.post('/forgot-password', new ForgotPasswordController().onHandleForgotPassword)

router.post('/check-otp', new ForgotPasswordController().onHandleValiteOTP)

router.post('/reset-password', new ForgotPasswordController().onHandleResetPassword)

router.post('/logout', logOut)

module.exports = router
