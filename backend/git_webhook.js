const { exec, spawn } = require('child_process')
const { parentPort } = require('worker_threads')

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
