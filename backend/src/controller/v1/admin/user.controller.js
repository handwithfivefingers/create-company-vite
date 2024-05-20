const { successHandler, errHandler } = require('../../../response')
const UserService = require('../../../service/v1/admin/user.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()

module.exports = class UserManageAdmin {
  PAGE_SIZE = 10

  constructor() {}

  onGetUser = async (req, res) => {
    try {
      const data = await new UserService(req).getUser(req)
      return successHandler(data, res)
    } catch (e) {
      console.log('error stack', e)
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: e,
      })

      return errHandler(e, res)
    }
  }

  onDeleteUser = async (req, res) => {
    try {
      const data = await new UserService(req).deleteUser(req)
      return successHandler(data, res)
    } catch (err) {
      console.log(err)
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: err,
      })
      return errHandler(err, res)
    }
  }
}
