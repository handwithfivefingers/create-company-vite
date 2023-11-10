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
  desc: {
    type: String,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
  ],
  fileRules: [
    {
      condition: [],
      then: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
      },
      else: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
      },
      statement: {
        type: String,
        enum: ['some', 'every'],
        default: 'some',
      },
    },
  ], //
}
