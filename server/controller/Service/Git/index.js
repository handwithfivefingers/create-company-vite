const exec = require('child_process').execSync
const crypto = require('crypto')
const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'
const secret = 'Hdme195'
const repo = '/usr/share/nginx/html/create-company-vite'

module.exports = class GitAction {
  gitPull = async (req, res) => {
    res.end()
    let cd = 'cd ' + repo
    let checkout = 'git checkout -- .'
    let pullCode = 'git pull'
    let installPackage = 'npm install'
    let buildPackage = 'npm run build'
    let restartPm2 = 'pm2 reload ecosystem.config.js'
    let chormium = cd + '/node_modules/puppeteer' + '/.local-chromium'

    try {
      console.log(`Git action::: ${cd}`)
      exec(cd)

      exec(checkout)

      exec(pullCode)

      exec(installPackage)

      console.log(`Action::: ${buildPackage}`)

      exec(buildPackage)

      // check folder if success

      // replace name with build folder
    } catch (err) {
      
      console.log('git error', err)
      // remove build folder if error
    } finally {
      // console.log('command :::::::::: ' + restartPm2)
      console.log(`Action::: ${restartPm2}`)
      exec(restartPm2)
    }
  }
}
