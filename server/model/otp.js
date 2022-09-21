module.exports = {
  email: String,
  otp: String,
  time: { type: Date, default: Date.now(), index: { expires: 300 } },
}
