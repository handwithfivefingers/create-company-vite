const AuthorizationService = require('./authorization')
const SMSService = require('./v1/third-connect/sms.service')
const AdminService = require('./v1/admin')
const UserService = require('./v1/user')

module.exports = { ...AuthorizationService, ...AdminService, ...UserService, SMSService }
