const { successHandler, errHandler } = require('../../../response')
const SettingService = require('../../../service/v1/admin/setting.service')

module.exports = class SettingController {
  onUpdateSetting = async (req, res) => {
    try {
      const data = await new SettingService(req).updateSetting(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  onGetSetting = async (req, res) => {
    try {
      const data = await new SettingService(req).getSetting(req)
      return res.status(200).json(data)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
