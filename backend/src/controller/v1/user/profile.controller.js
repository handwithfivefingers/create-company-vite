const { successHandler, errHandler } = require('../../../response')
const ProfileService = require('../../../service/v1/user/profile.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class ProfileController {
  onGetUser = async (req, res) => {
    try {
      const data = await new ProfileService().onHandleGetProfile(req, res)

      return successHandler(data, res)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return errHandler(error, res)
    }
  }
  onUpdateProfile = async (req, res) => {
    try {
      const data = await new ProfileService().onHandleUpdateProfile(req, res)
      return successHandler(data, res)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return errHandler(error, res)
    }
  }

  onChangePassword = async (req, res) => {
    try {
      return successHandler({ message: 'Permission not allow' }, res)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return errHandler(error, res)
    }
  }
}
