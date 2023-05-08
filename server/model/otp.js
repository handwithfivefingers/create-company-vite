module.exports = {
  email: String,
  otp: String,
  time: { type: Date, default: Date.now(), index: { expireAfterSeconds: 300 } },
}
