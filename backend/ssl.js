const exec = require('child_process').execSync

const repo = '/usr/share/nginx/html/create-company-vite'
const domain = 'app.thanhlapcongtyonline.vn'
const commandLine = `certbot -d ${domain}`

process.on('message', (msg) => {
  console.log('Start Generate SSL')
})

const buildFunction = async () => {
  try {
    process.send({
      message: `Action::: ${commandLine}`,
    })

    const stdout = exec(commandLine)

    process.send({
      message: `stdout::: ${stdout.toString()}`,
    })
  } catch (err) {
    console.log('Generate SSL error', err)
    if (err.stderr) {
      process.send({
        message: `sdterr::: ${err.stderr.toString()}`,
      })
    }
  } finally {
    process.exit()
  }
}

buildFunction()
