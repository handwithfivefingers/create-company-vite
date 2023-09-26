const FileService = require('@service/v1/admin/file.service')

module.exports = class FileController {
  onReadFile = async (req, res) => {
    try {
      const data = await new FileService(req).readFile(req)
      return res.status(200).json({ data })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
