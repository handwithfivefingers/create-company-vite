const env = require('dotenv')

const express = require('express')

// const app = express()
const helmet = require('helmet')
const cors = require('cors')

const cookieParser = require('cookie-parser')

const path = require('path')

const AppRouter = require('@route')

const GitRouter = require('@route/v1/git')

const { TrackingApi } = require('@middleware')

env.config()

const { NODE_ENV } = process.env

const URL_PERMISSIONS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'https://app.thanhlapcongtyonline.vn',
  'http://10.0.14.235:3003',
]

const corsOptions = {
  credentials: true,
  origin: URL_PERMISSIONS,
}

module.exports = class ConfigApp {
  constructor(app) {
    this.app = app
    console.log('Routed Loaded')
  }

  onInit = () => {
    this.onLoadConfig()
    this.onLoadUploadConfigs()
    this.onLoadSourceHTML()
    this.onLoadRouter()
    this.onHandlerError()
  }

  onLoadConfig = () => {
    this.app.set('trust proxy', 1)
    this.app.use(helmet())
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
    this.app.use(express.static(path.join(global.__basedir, 'dist')))
    if (NODE_ENV !== 'development') {
      this.app.get('/*', cors(corsOptions), (req, res) => {
        res.sendFile(path.join(global.__basedir, 'dist', 'index.html'))
      })
    }

    return this
  }
  
  onHandlerError = () => {
    this.app.use((err, req, res, next) => {
      res.status(500).send({
        error: err.stack,
        message: 'Internal Server Error',
      })
    })
    return this
  }
}
