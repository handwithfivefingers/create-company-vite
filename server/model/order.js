const mongoose = require('mongoose')

module.exports = {
  price: {
    type: Number,
    required: true,
  },
  orderOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  track: {
    step: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  data: {
    create_company: {
      type: Object,
    },
    change_info: {
      type: Object,
    },
    pending: {
      type: Object,
    },
    dissolution: {
      type: Object,
    },
    uy_quyen: {
      type: Object,
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  files: [
    {
      type: Object,
    },
  ],
  send: {
    type: Number,
    default: 0,
    enum: [0, 1],
  },
  delete_flag: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  },
}
