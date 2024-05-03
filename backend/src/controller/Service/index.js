const payment = require('./Payment')
const cronjob = require('./Cronjob')
const ReadAndWrite = require('./ReadAndWrite')

module.exports = {
  ...payment,
  ...cronjob,
  ...ReadAndWrite,
}
