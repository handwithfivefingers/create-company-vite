const { Schema } = require('mongoose')

module.exports = {
  name: {
    type: String,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'FileCategory',
  },
  delete_flag: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
}
