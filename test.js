const exec = require('child_process').execSync

const repo = '/usr/share/nginx/html/create-company-vite'
const crypto = require('crypto')
const sigHeaderName = 'X-Hub-Signature-256'
const sigHashAlg = 'sha256'
const secret = 'Hdme195'

process.on('message', (msg) => {
  console.log('start process')
})

const buildFunction = async () => {
  const cd = 'cd ' + repo

  const checkout = 'git checkout -- .'

  const pullCode = 'git pull'

  const installPackage = 'npm install'

  const buildPackage = 'yarn build'

  const newSource = " find ./ -name dist-build ! -path './node_modules/*'"

  const oldSource = " find ./ -name dist ! -path './node_modules/*'"

  const removeOldSource = 'rm -rf dist'

  const rename = 'mv dist-build dist'

  try {
    exec(cd)

    exec(checkout)

    exec(pullCode)

    exec(installPackage)

    process.send({
      message: `Action::: ${buildPackage}`,
    })

    exec(buildPackage)

    process.send({
      message: `Action::: ${oldSource}`,
    })

    const execOldSource = exec(oldSource, { encoding: 'utf8' })

    process.send({
      message: `Action::: ${newSource}`,
    })

    const execNewSource = exec(newSource, { encoding: 'utf8' })

    if (!execNewSource) return

    if (execOldSource) {
      process.send({
        message: 'remove old source',
      })
      process.send({
        message: `Action::: ${removeOldSource}`,
      })

      exec(removeOldSource)
    }

    process.send({
      message: 'rename',
    })

    process.send({
      message: `Action::: ${rename}`,
    })

    exec(rename)
  } catch (err) {
    console.log('git error', err)
  } finally {
    process.exit()
  }
}

buildFunction()
