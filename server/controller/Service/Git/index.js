// const exec = require('child_process').
// const { execSync: exec, fork } = require('child_process')

const { Worker, isMainThread } = require('worker_threads')

module.exports = class GitAction {
  gitPull = async (req, res) => {
    // const restartPm2 = 'pm2 reload ecosystem.config.js'
    try {
      res.end()

      if (isMainThread) {
        const service = new Worker(`${global.__basedir}/git_webhook.js`)
        service.emit('message', (msg) => console.log(`Worker : ` + msg))
        service.on('exit', (code) => {
          if (code !== 0) throw new Error(`Worker stopped with exit code ${code}`)
        })
      }
    } catch (err) {
      console.log('childProcess error', err)
    } finally {
      // childProcess.on('exit', (msg) => {
      //   console.log('childProcess terminated', msg)
      //   console.log(`Action::: ${restartPm2}`)
      //   exec(restartPm2)
      // })
      // service.on('exit', (msg) => {
      //   console.log('childProcess terminated', msg)
      //   console.log(`Action::: ${restartPm2}`)
      //   exec(restartPm2)
      // })
    }
  }
}
