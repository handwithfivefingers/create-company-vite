const env = require('dotenv')
env.config()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1 // Conflict ssl