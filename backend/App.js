// require('module-alias/register')

const express = require('express')
const app = express()
const Cronjob = require('./src/controller/v1/user/cronjob.controller')
const db = require('./src/configs/db')
const appConfig = require('./src/configs/defaultConfig')
const LoadEnv = require('./src/configs/loadENV')
const moment = require('moment-timezone')

require('moment/locale/vi')

moment.tz.setDefault('Asia/Bangkok')

global.__basedir = __dirname

const { NODE_ENV, PORT, DEV_PORT } = process.env

const RUNTIME_PORT = NODE_ENV === 'development' ? DEV_PORT || 3001 : PORT
const { initEnvLoaded } = new LoadEnv()

const { connectDB } = new db()

const { onInit } = new appConfig(app)

const { onConvertFiles, onBackupDB, onGenSSL } = new Cronjob()

initEnvLoaded()
onInit()

app.listen(RUNTIME_PORT, async () => {
  await connectDB()
  // onConvertFiles()
  onBackupDB()
  onGenSSL()

})
