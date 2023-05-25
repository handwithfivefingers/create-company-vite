module.exports = {
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['EMAIL', 'SMS'],
  },
  delete_flag: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  time: { type: Date, default: Date.now, index: { expires: 300 } },
}
