// require('module-alias/register')

const moduleAlias = require('module-alias')

moduleAlias.addAliases({
  '@server': `${__dirname}/server`,
  '@controller': `${__dirname}/server/controller`,
  '@middleware': `${__dirname}/server/middleware`,
  '@route': `${__dirname}/server/route`,
  '@model': `${__dirname}/server/model`,
  '@response': `${__dirname}/server/response`,
  '@constant': `${__dirname}/server/constant`,
  '@common': `${__dirname}/server/common`,
  '@service': `${__dirname}/server/service`,
  '@uploads': `${__dirname}/uploads`,
})

const express = require('express')

const app = express()

const Cronjob = require('./server/controller/v1/user/cronjob.controller')

const db = require('./server/configs/db')

const appConfig = require('./server/configs/defaultConfig')

const LoadEnv = require('./server/configs/loadENV')
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
  console.log(`Server is running on Port ${RUNTIME_PORT}`)
  console.log('???')
})
