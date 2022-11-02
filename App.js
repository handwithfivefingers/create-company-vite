require('module-alias/register')

const express = require('express')

const app = express()

const Cronjob = require('./server/controller/Service/Cronjob')

const db = require('./server/configs/db')

const appConfig = require('./server/configs/defaultConfig')

const LoadEnv = require('./server/configs/loadENV')

const { spawn, fork, exec, execSync } = require('child_process')

global.__basedir = __dirname

const { NODE_ENV, PORT, DEV_PORT } = process.env

const RUNTIME_PORT = NODE_ENV === 'development' ? DEV_PORT || 3001 : PORT

const { initEnvLoaded } = new LoadEnv()

const { connectDB } = new db()

const { onInit } = new appConfig(app)

const { task, backupDB } = new Cronjob()

initEnvLoaded()

onInit()

// Cron running ;

app.listen(RUNTIME_PORT, async () => {
  await connectDB()

  task.start()

  backupDB.start()

  console.log(`Server is running ${RUNTIME_PORT}`)
  // console.log(process.env.PATH)`

  const res = execSync("find ./ -name dist-build ! -path './node_modules/*'", { encoding: 'utf8' })

  // console.log('err', typeof res.err, res.err)
  // console.log('stdout', typeof res.stdout, res.stdout)
  // console.log('stderr', typeof res.stderr, res.stderr)
})
