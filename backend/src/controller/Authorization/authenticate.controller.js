const TELEGRAM_CODE = require('../../constant/telegramCode')
const AuthenticateService = require('../../service/authorization/authenticate.service')
const BotService = require('../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()

module.exports = class AuthenticateController {
  onHandleVerifyTokenToLoginOrRegister = async (req, res) => {
    try {
      const data = await new AuthenticateService().onVerifyToken(req, res)
      return res.status(200).json(data)
    } catch (error) {
      console.log('onHandleVerifyTokenToLoginOrRegister', error)
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        data: error,
      })
      return res.status(400).json({ ...error })
    }
  }
  onHandleVerificationResend = async (req, res) => {
    try {
      await new AuthenticateService().onVerificationResend(req, res)

      return res.status(200).json({
        data: {
          message: 'Yêu cầu gửi lại thành công',
        },
      })
    } catch (error) {
      console.log('onHandleVerifyTokenToLoginOrRegister', error)
      TelegramBot.onHandleErrorMsg({ remoteAddress: req.remoteAddress, originalUrl: req.originalUrl, data: error })
      return res.status(400).json({ message: error.toString(), stack: error.stack })
    }
  }
  onHandleVerifyUserExist = async (req, res) => {
    try {
      const { phone, email } = req.body

      if (!phone || !email) return res.sendStatus(400)

      const data = await new AuthenticateService().isUserExist(req, res)

      return res.status(200).json({
        ...data,
      })
    } catch (error) {
      console.log('onCheckUserExist', error)
      TelegramBot.onHandleErrorMsg({ remoteAddress: req.remoteAddress, originalUrl: req.originalUrl, data: error })
      return res.status(200).json({
        ...error,
      })
    }
  }
  onHandleVerifyToken = async (req, res) => {
    try {
      const data = await new AuthenticateService().isTokenExist(req)
      if (data) return res.sendStatus(200)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        data: error,
      })
      return res.sendStatus(400)
    }
  }
}
