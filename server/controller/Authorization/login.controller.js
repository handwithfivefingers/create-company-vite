const { LoginService } = require('@service')

module.exports = class LoginController {
  constructor() {}

  onHandleLogin = async (req, res) => {
    try {
      const { data, authenticate, callbackUrl } = await new LoginService().loginUserWithOtp(req, res)

      return res.status(200).json({ data, authenticate, callbackUrl })
    } catch (error) {
      return res.status(400).json({
        ...error,
      })
    }
  }

  onHandleGetOTPForLogin = async (req, res) => {
    try {
      const data = await new LoginService().getUserOTPForLogin(req, res)

      return res.status(200).json({
        data,
      })
    } catch (error) {
      return res.status(400).json({
        ...error,
      })
    }
  }

  onHandleVerifyToken = async (req, res) => {
    try {
      return res.status(200).json({
        authenticate: true,
        role: req.role,
      })
    } catch (error) {
      return res.status(401).json({
        ...error,
        message: error?.message,
      })
    }
  }

  onCheckUserExist = async (req, res) => {
    try {
      const { phone, email } = req.body

      if (!phone || !email) return res.sendStatus(400)

      const data = await new LoginService().isUserExist(req, res)

      return res.status(200).json({
        ...data,
      })
    } catch (error) {
      console.log('onCheckUserExist', error)
      return res.status(200).json({
        ...error,
      })
    }
  }
}
