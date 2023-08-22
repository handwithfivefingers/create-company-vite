const { exec, spawn } = require('child_process')
const { parentPort } = require('worker_threads')
// const crypto = require('crypto')
// const sigHeaderName = 'X-Hub-Signature-256'
// const sigHashAlg = 'sha256'
// const secret = 'Hdme195'
// const repo = '/usr/share/nginx/html/create-company-vite'

// parentPort.on('message', () => {
//   console.log('start process')
// })
// const cd = 'cd ' + repo

// const checkout = 'git checkout -- .'

// const pullCode = 'git pull'

// const installPackage = 'npm install'

// const buildPackage = 'yarn build'

// const newSource = " find ./ -name dist-build ! -path './node_modules/*'"

// const oldSource = " find ./ -name dist ! -path './node_modules/*'"

// const removeOldSource = 'rm -rf dist'

// const rename = 'mv dist-build dist'

async function build() {
  parentPort.on('message', () => console.log('Trigger Shell')).unref()

  const spawned = spawn('sh git.sh', [], { shell: true })

  spawned.stdout.on('data', (data) => console.log(data.toString()))

  spawned.stderr.on('data', function (data) {
    console.log(data.toString())
  })
  spawned.on('exit', function (code) {
    console.log('exit :', code.toString())
    exec('pm2 reload ecosystem.config.js')
  })
}
build()
