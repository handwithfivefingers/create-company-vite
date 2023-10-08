const express = require('express')
const { upload, requireSignin, limit } = require('@middleware')
const router = express.Router()

const LoginController = require('@controller/Authorization/login.controller')
const RegisterController = require('@controller/Authorization/register.controller')
const AuthenticateController = require('../../controller/Authorization/authenticate.controller')

const apiLimitRate = limit({ maxRate: 1 })

const logOut = (req, res) => {
  res.clearCookie('sessionId')
  return res.status(200).json({
    authenticate: false,
  })
}

//  DONE

router.post('/register-otp', apiLimitRate, new RegisterController().onHandleGetRegisterOtp)
//  DONE

router.post('/login-otp', apiLimitRate, new LoginController().onHandleGetOTPForLogin)

// router.post('/login', new LoginController().onHandleLogin)

//  DONE
router.post('/verification', new AuthenticateController().onHandleVerifyTokenToLoginOrRegister)
//  DONE

router.post('/verification-user', new AuthenticateController().onHandleVerifyUserExist)
//

router.post('/verification-resend', new AuthenticateController().onHandleVerificationResend)

//  DONE

router.post('/auth', requireSignin, new LoginController().onHandleVerifyToken)

//  Readable
router.post('/login-admin', upload.none(), new LoginController().onLoginAsAdmin)
//  DONE

router.post('/logout', logOut)

module.exports = router
