const { permisHandler, successHandler, errHandler } = require('@response')
const { Setting } = require('@model')
const SettingService = require('../../../service/v1/admin/setting.service')

module.exports = class SettingController {
  onUpdateSetting = async (req, res) => {
    try {
      const data = await new SettingService().updateSetting(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  onGetSetting = async (req, res) => {
    try {
      const data = await new SettingService().getSetting(req, res)
      return res.status(200).json(data)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
