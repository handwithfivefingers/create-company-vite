const mongoose = require('mongoose')
module.exports = {
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  paymentType: {
    type: Number,
    enum: [1, 2, 3],
    require: true,
  },
  paymentDate: {
    type: Number,
    require: true,
  },
  paymentCode: {
    // Rule: [paymentType]-[productCode]-[last 6 Unix Timestamp ]
    type: String,
    require: true,
  },
  isPayment: {
    type: Boolean,
    require: true,
    default: false,
  },
  deliveryInformation: {
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
  },
  orderInfo: {
    default: {},
    // Information when callback from 3-party Payment <---
  },
}
