const payment = require('./payment')
const git = require('./git')
const cronjob = require('./cronjob')
const province = require('./province')
const ReadAndWrite = require('./ReadAndWrite')

module.exports = {
  ...payment,
  ...git,
  ...cronjob,
  ...province,
  ...ReadAndWrite,
}
