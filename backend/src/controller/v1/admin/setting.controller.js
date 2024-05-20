const { successHandler, errHandler } = require('../../../response')
const SettingService = require('../../../service/v1/admin/setting.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()

module.exports = class SettingController {
  onUpdateSetting = async (req, res) => {
    try {
      const data = await new SettingService(req).updateSetting(req)
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

  onGetSetting = async (req, res) => {
    try {
      const data = await new SettingService(req).getSetting(req)
      return res.status(200).json(data)
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
