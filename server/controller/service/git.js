const exec = require('child_process').execSync
const crypto = require('crypto')
const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'
const secret = 'Hdme195'
const repo = '/usr/share/nginx/html/create-company-vite'

const gitAction = async (req, res) => {
  // if (process.env.NODE_ENV === 'development') return res.end();
  res.end()

  let cd = 'cd ' + repo
  let checkout = 'git checkout -- .'
  let pullCode = 'git pull'
  let installPackage = 'npm install'
  let buildPackage = 'npm run build'
  let restartPm2 = 'pm2 reload ecosystem.config.js'
  let chormium = cd + '/node_modules/puppeteer' + '/.local-chromium'

  try {
    console.log('command :::::::::: ' + cd)

    exec(cd)

    console.log('command :::::::::: ' + checkout)

    exec(checkout)

    console.log('command :::::::::: ' + pullCode)

    exec(pullCode)

    console.log('command :::::::::: ' + installPackage)

    exec(installPackage)

    console.log('command :::::::::: ' + buildPackage)

    exec(buildPackage)
    // check folder if success

    // replace name with build folder
    console.log('Done :::::::::: ')
  } catch (err) {
    console.log('git error', err)
    // remove build folder if error
  } finally {
    console.log('command :::::::::: ' + restartPm2)
    exec(restartPm2)
  }
}

module.exports = { gitAction }
