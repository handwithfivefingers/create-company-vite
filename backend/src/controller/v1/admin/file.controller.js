const FileService = require('../../../service/v1/admin/file.service')
const { errHandler, successHandler } = require('../../../response')

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

  onEditFiles = async (req, res) => {
    try {
      const data = await new FileService(req).onEditFiles(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onDeleteFiles = async (req, res) => {
    try {
      const { _id } = req.params
      const result = await new FileService(req).deleteFiles({ _id })
      return successHandler(result, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
