const { successHandler, errHandler, deletedHandler } = require('../../../response')
const OfficeAdminService = require('../../../service/v1/admin/office.service')

module.exports = class OfficeAdmin {
  getOfficeFiles = async (req, res) => {
    try {
      const data = await new OfficeAdminService(req).getOfficeFiles(req)
      return successHandler(data, res)
    } catch (err) {
      console.log('getOrderBySlug error')
      return errHandler(err, res)
    }
  }

  getBrowserToken = async (req, res) => {
    try {
      const data = await new OfficeAdminService(req).getBrowserToken(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
