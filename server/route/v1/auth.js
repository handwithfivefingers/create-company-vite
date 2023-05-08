const express = require('express')
const { upload, requireSignin } = require('@middleware')

const router = express.Router() // get || post || put || delete || ....

const Authorization = require('@controller/Authorization')

const {
  registerUser,
  LoginUser,
  Logout,
  Authenticate,
  ForgotPassword,
  ValidateOTP,
  ResetPassword,
  getUserOTPForLogin,
  loginUserWithOtp,
} = new Authorization()

// // Create User
router.post('/register', upload.none(), registerUser)

//login
// router.post('/login', upload.none(), LoginUser)
router.post('/login', upload.none(), loginUserWithOtp)

router.post('/login-otp', upload.none(), getUserOTPForLogin)

//logout
router.post('/logout', upload.none(), Logout)

//authenticate
router.post('/auth', requireSignin, Authenticate)

router.post('/forgot-password', ForgotPassword)

router.post('/check-otp', ValidateOTP)

router.post('/reset-password', ResetPassword)

module.exports = router
