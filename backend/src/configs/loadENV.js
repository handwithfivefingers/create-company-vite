const env = require('dotenv')

module.exports = class LoadEnv {
  constructor() {
    env.config()
    console.log('Environments Loaded')
  }

  initEnvLoaded = () => {
    this.envLoaded()
  }
  envLoaded = () => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1 // Conflict ssl
  }
}
