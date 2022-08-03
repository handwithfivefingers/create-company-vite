/**
 * @List Admin Controller
 */
const logs = require('./logs')
const order = require('./order')
const template = require('./template')
const user = require('./user')
const file = require('./FileManager')

module.exports = {
  ...logs,
  ...order,
  ...template,
  ...user,
  ...file,
}
