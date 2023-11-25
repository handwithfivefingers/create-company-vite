const { Worker, isMainThread } = require('worker_threads')
module.exports = class GitAction {
  gitPull = async (req, res) => {
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
    }
  }
}
