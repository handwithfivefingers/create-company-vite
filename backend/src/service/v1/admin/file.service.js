const BaseAdminService = require('../../../common/baseService')
const fs = require('fs')
const path = require('path')
const { Order, File, FileCategory } = require('../../../model')
const { startSession } = require('mongoose')
const moment = require('moment')

const DATE_FORMAT = 'YYYYMMDDHHmm'
const UPLOAD_PATH = 'document'
module.exports = class FileService extends BaseAdminService {
  readFile = async (req, res) => {
    try {
      let folderName = path.resolve(path.join(global.__basedir, 'uploads'))

      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)

        return { message: 'created folder' }
      } else {
        let folder = fs.readdirSync(folderName)

        return folder
      }
    } catch (error) {
      throw error
    }
  }

  onUploadFiles = async (req) => {
    const t = await startSession()
    try {
      t.startTransaction()
      const { fileName, fileCategory } = req.body

      // const isFileCategoryExist = await FileCategory.findOne({ _id: fileCategory, delete_flag: 0 })

      // if (!isFileCategoryExist) throw { message: 'Category doesnt exist' }

      const [file] = req.files.uploadFiles

      const uploadPath = path.join(global.__basedir, 'uploads', 'document')

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath)
      }

      const { pathStorage, fileOriginalName } = await this.saveFiles(file)

      const _filesModels = new File({
        fileName,
        fileOriginalName,
        path: pathStorage,
        // fileCategory,
      })

      await _filesModels.save()

      await t.commitTransaction()

      return { message: 'Upload file thành công' }
    } catch (error) {
      console.log('onUploadFiles error', error)
      await t.abortTransaction()
      throw error
    } finally {
      t.endSession()
    }
  }

  onEditFiles = async (req) => {
    const t = await startSession()

    try {
      t.startTransaction()
      const { _id } = req.params

      const { fileName } = req.body

      const [file] = req.files?.uploadFiles || []

      const _file = await File.findById(_id)

      if (!_file) throw { message: 'File doesnt exist !' }

      if (fileName) _file.fileName = fileName

      if (file) {
        const currentFile = path.join(global.__basedir, 'uploads', _file.path)
        const isExist = fs.existsSync(currentFile)
        if (isExist) {
          fs.unlink(currentFile, (err, output) => {
            if (err) console.log('err')
            if (output) console.log('unlink', output)
          })
        }
        const uploadPath = path.join(global.__basedir, 'uploads', 'document')
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath)
        }
        const { pathStorage, fileOriginalName } = await this.saveFiles(file)
        _file.fileOriginalName = fileOriginalName
        _file.path = pathStorage
      }

      await _file.save()

      await t.commitTransaction()

      return { message: 'Upload file thành công' }
    } catch (error) {
      console.log('onUploadFiles error', error)
      await t.abortTransaction()
      throw error
    } finally {
      t.endSession()
    }
  }

  getListFiles = async (req) => {
    try {
      // const { fileCategory } = req.query
      // if (!fileCategory) throw new Error('fileCategory must be provided')
      const files = await File.find({ delete_flag: 0 })
      return files
    } catch (error) {
      throw error
    }
  }

  saveFiles = (file) => {
    const cache = []
    try {
      const { originalname, buffer } = file

      const fileSplit = originalname.split('.')
      const ext = fileSplit.pop()
      const name = fileSplit.join('.')

      const ref = `${moment().format(DATE_FORMAT)}-${name}.${ext}`

      const refPath = path.join(UPLOAD_PATH, ref)

      const basePath = path.join(global.__basedir, 'uploads')

      const pathStorage = path.join(basePath, refPath)

      fs.writeFileSync(pathStorage, buffer)

      cache.push(pathStorage)

      return {
        pathStorage: refPath,
        fileOriginalName: originalname,
      }
    } catch (error) {
      if (cache.length) {
        for (let pathCache of cache) {
          if (fs.existsSync(pathCache)) {
            fs.unlink(pathCache)
          }
        }
      }
      throw error
    }
  }

  deleteFiles = async ({ _id }) => {
    try {
      await File.updateOne(
        {
          _id,
        },
        {
          delete_flag: 1,
        },
        { new: true },
      )
      return true
    } catch (error) {
      throw error
    }
  }
}
