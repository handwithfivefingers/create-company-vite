const mongoose = require('mongoose')

module.exports = {
  slug: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
  },
  price: {
    type: String,
  },
  type: {
    type: Number,
    required: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
}
