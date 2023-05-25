const AuthorizationService = require('./authorization')
const SMSService = require('./sms.service')
module.exports = { ...AuthorizationService, SMSService }
