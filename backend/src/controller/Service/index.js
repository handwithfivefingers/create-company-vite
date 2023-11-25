const payment = require('./payment')
const cronjob = require('./cronjob')
const ReadAndWrite = require('./ReadAndWrite')

module.exports = {
  ...payment,
  ...cronjob,
  ...ReadAndWrite,
}
