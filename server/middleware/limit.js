const rateLimit = require('express-rate-limit')

const limit = ({ maxRate = 1 }) =>
  rateLimit({
    windowMs: 60 * 1000,
    max: maxRate,
  })

module.exports = { limit }
