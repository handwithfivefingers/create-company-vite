require('module-alias/register')

const express = require('express')

const env = require('dotenv')

const app = express()

const Cronjob = require('./server/controller/Service/Cronjob')

const { task } = new Cronjob()
// env.config()

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1 // Conflict ssl

global.__basedir = __dirname

const { NODE_ENV, PORT, DEV_PORT } = process.env

const RUNTIME_PORT = NODE_ENV === 'development' ? DEV_PORT || 3001 : PORT

const db = require('./server/configs/db')

const appConfig = require('./server/configs/defaultConfig')

const { connectDB } = new db()

const { onInit } = new appConfig(app)

onInit()

// Cron running ;

app.listen(RUNTIME_PORT, async () => {
  await connectDB()
  task.start()
  // if (process.env.NODE_ENV !== 'development') {
  //   task.start()
  // }
  console.log(`Server is running ${RUNTIME_PORT}`)
})
