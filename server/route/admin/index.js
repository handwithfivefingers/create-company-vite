/**
 * @List Admin Router
 */
const LogRoute = require('./logs')
const AdminOrderRoute = require('./order')
const MailRoute = require('./template')
const FileRoute = require('./file')
const SettingRoute = require('./setting')

module.exports = {
  LogRoute,
  AdminOrderRoute,
  MailRoute,
  FileRoute,
  SettingRoute,
}
