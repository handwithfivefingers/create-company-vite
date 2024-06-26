const env = require('dotenv')

const express = require('express')

// const app = express()
const helmet = require('helmet')
const cors = require('cors')

const cookieParser = require('cookie-parser')

const path = require('path')

const AppRouter = require('../route')

const GitRouter = require('../route/v1/git')

const { TrackingApi } = require('../middleware')
const BotService = require('../service/v1/third-connect/bot.service')
const moment = require('moment-timezone')
const TELEGRAM_CODE = require('../constant/telegramCode')
env.config()

const { NODE_ENV } = process.env

const URL_PERMISSIONS = [
  'http://localhost:80',
  'http://localhost:6969',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'https://app.thanhlapcongtyonline.vn',
  'http://10.0.14.235:3003',
  '172.16.52.12:3001',
]

const corsOptions = {
  credentials: true,
  origin: URL_PERMISSIONS,
}

const TelegramBot = new BotService()

module.exports = class ConfigApp {
  constructor(app) {
    this.app = app
    console.log('Routed Loaded')
  }

  onInit = () => {
    this.onLoadConfig()
    this.onLoadUploadConfigs()
    this.onLoadRouter()
    this.onLoadSourceHTML()
    this.onHandlerError()
  }

  onLoadConfig = () => {
    this.app.set('trust proxy', 1)
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            // fontSrc: ["'self'"],
            // imgSrc: ["'self'"],
            scriptSrc: [
              "'self'",
              'https://*.truyenmai.com',
              'https://*.zalo.me/',
              'https://office.truyenmai.com/web-apps/apps/api/documents/api.js',
              'https://sp.zalo.me/plugins/sdk.js',
              "'unsafe-inline'",
            ],
            // styleSrc: ["'self'"],
            frameSrc: [
              "'self'",
              'https://*.truyenmai.com/',
              'https://*.zalo.me/',
              'https://office.truyenmai.com/web-apps/apps/api/documents/api.js',
              'https://sp.zalo.me/plugins/sdk.js',
            ],
            connectSrc: [
              "'self'",
              'https://*.truyenmai.com/',
              'https://*.zalo.me/',
              'https://office.truyenmai.com/web-apps/apps/api/documents/api.js',
              'https://sp.zalo.me/plugins/sdk.js',
              "'unsafe-inline'",
            ],
          },
          // reportOnly: true, // Set to 'true' to enable report-only mode
        },
        crossOriginResourcePolicy: { policy: 'cross-origin' },
        crossOriginEmbedderPolicy: false,
      }),
    )
    this.app.use(express.json())
    this.app.use(cookieParser())
    return this
  }

  onLoadUploadConfigs = () => {
    this.app.use('/public', cors(corsOptions), express.static(path.join(global.__basedir, 'uploads')))
    this.app.use('/robots.txt', (req, res) => {
      let robotFile = path.join(global.__basedir, 'uploads', 'robots.txt')
      res.sendFile(robotFile)
    })
    return this
  }

  onLoadRouter = () => {
    this.app.use('/git', GitRouter)
    this.app.use('/api', cors(corsOptions), TrackingApi, AppRouter)
    return this
  }

  onLoadSourceHTML = () => {
    const dirPath = path.join(global.__basedir, 'www')
    this.app.use(express.static(path.join(global.__basedir, 'wwww')))
    this.app.use(express.static(dirPath))
    this.app.get('/*', cors(corsOptions), (req, res) => {
      res.sendFile(path.join(global.__basedir, 'www', 'index.html'))
    })
    return this
  }

  onHandlerError = () => {
    this.app.use((err, req, res, next) => {
      const msg = `

     <b>${moment().format('YYYY/MM/DD HH:mm:ss')}:</b>
      - IP: <code>${req.remoteAddress?.replace('::ffff:', '')}</code> 
      - URL:<code>${req.originalUrl} </code>
      - Description: <code>${JSON.stringify(err)}</code>
      --------------------------------------------------------------------------------
      `
      TelegramBot.onSendMessage({ message: msg })
      res.status(500).send({
        error: err.stack,
        message: 'Internal Server Error',
      })
    })
    return this
  }
}
