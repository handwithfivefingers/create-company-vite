const { LoginService } = require('../../service')
const { signToken } = require('../../common/helper')
const BotService = require('../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()

module.exports = class LoginController {
  constructor() {}
  onHandleGetOTPForLogin = async (req, res) => {
    try {
      const data = await new LoginService().getUserOTPForLogin(req, res)

      const tokenVerify = await signToken(
        { email: data.email, phone: data.phone, deleteOldUser: data.deleteOldUser, method: 'LOGIN' },
        { expiresIn: '5m' },
      )
      res.cookie('verifyToken', tokenVerify, {
        maxAge: 1000 * 60 * 5, // 5 Mins
      })

      return res.status(200).json({
        data: {
          message: data.message,
        },
      })
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        data: error,
      })
      return res.status(400).json({
        ...error,
        message: error.toString(),
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
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        data: error,
      })
      return res.status(401).json({
        ...error,
        message: error?.message,
      })
    }
  }

  onLoginAsAdmin = async (req, res) => {
    try {
      const data = await new LoginService().onLoginAsAdmin(req, res)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        data: error,
      })
      console.log('LoginAsAdmin error', error)
      return res.status(400).json({
        error,
      })
    }
  }
}
