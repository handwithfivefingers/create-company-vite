const payment = require('./payment')
const cronjob = require('./cronjob')
const province = require('./province')
const ReadAndWrite = require('./ReadAndWrite')

const Puppeteer = require('./Puppeteer')

module.exports = {
  ...payment,
  ...cronjob,
  ...province,
  ...ReadAndWrite,
  ...Puppeteer,
}
