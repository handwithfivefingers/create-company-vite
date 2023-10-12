const { Schema } = require('mongoose')

module.exports = {
  fileName: {
    type: String,
    required: true,
  },
  fileOriginalName: {
    type: String,
  },
  path: {
    type: String,
    required: true,
  },
  fileCategory: {
    type: Schema.Types.ObjectId,
    ref: 'FileCategory',
  },
  delete_flag: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
}
