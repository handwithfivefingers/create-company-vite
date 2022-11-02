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
    // exec(cd)

    // exec(checkout)

    // exec(pullCode)

    exec(installPackage)

    process.send({
      message: `Action::: ${buildPackage}`,
    })

    exec(buildPackage)

    process.send({
      message: `Action::: ${oldSource}`,
    })

    const { err: oldSourceError, stdout: oldSourcesdtout, stderr: oldSourceStdErr } = exec(oldSource)

    process.send({
      message: `Action::: ${newSource}`,
    })

    const { err, stdout, stderr } = exec(newSource)

    if (oldSourceError === null) {
      return
    }

    if (err === null) {
      return
    }

    if (stdout) {
      if (oldSourcesdtout) {
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
    }

    // if (oldSourcesdtout && stdout) {
    //   exec(removeOldSource)

    //   exec(rename)
    // }
  } catch (err) {
    console.log('git error', err)
  } finally {
    process.exit()
  }
}

buildFunction()
