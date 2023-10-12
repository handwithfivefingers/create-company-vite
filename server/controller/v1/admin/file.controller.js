const FileService = require('@service/v1/admin/file.service')
const { errHandler, successHandler } = require('@response')

module.exports = class FileController {
  onGetFiles = async (req, res) => {
    try {
      const data = await new FileService(req).getListFiles(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  onUploadFiles = async (req, res) => {
    try {
      const data = await new FileService(req).onUploadFiles(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
