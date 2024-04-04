const { Schema } = require('mongoose')

module.exports = {
  folderUri: {
    type: String,
    required: true,
  },
  orderID: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  data: {},
  delete_flag: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
}
