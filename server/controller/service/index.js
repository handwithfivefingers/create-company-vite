const payment = require('./payment')
const cronjob = require('./cronjob')
const province = require('./province')
const ReadAndWrite = require('./ReadAndWrite')

module.exports = {
  ...payment,
  ...cronjob,
  ...province,
  ...ReadAndWrite,
}
