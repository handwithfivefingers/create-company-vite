/**
 * @List Admin Router
 */
const LogRoute = require('./logs')
const AdminOrderRoute = require('./order')
const MailRoute = require('./template')
const FileRoute = require('./file')
const SettingRoute = require('./setting')
const UserRoute = require('./user')
const ProductAdmin = require('./product')
const CategoryAdmin = require('./category')

module.exports = {
  LogRoute,
  AdminOrderRoute,
  MailRoute,
  FileRoute,
  SettingRoute,
  UserRoute,
  ProductAdmin,
  CategoryAdmin,
}
