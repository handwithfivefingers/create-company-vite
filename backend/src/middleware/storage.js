const multer = require('multer')

class Uploader {
  storage = multer.memoryStorage()
  upload = multer({ storage: this.storage })
}

module.exports = new Uploader().upload
