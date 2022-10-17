const mongoose = require('mongoose')

module.exports = {
  name: {
    type: String,
    required: true,
  },
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
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  payment: {
    type: Number,
    enum: [0, 1],
    default: 0,
    required: true,
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
  orderId: {
    type: Number,
  },
  orderCreated: {
    type: Number,
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
}
