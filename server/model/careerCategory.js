module.exports = {
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  delete_flag: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
}
