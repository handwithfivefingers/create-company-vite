const AuthorizationService = require('./authorization')

const SMSService = require('./v1/third-connect/sms.service')
const AdminService = require('./v1/admin')

module.exports = { ...AuthorizationService, ...AdminService, SMSService }
