const env = require('dotenv')

const express = require('express')

// const app = express()

const cors = require('cors')

const cookieParser = require('cookie-parser')

const path = require('path')

const AppRouter = require('@route')

const GitRouter = require('@route/v1/git')

env.config()

const { NODE_ENV } = process.env

const URL_PERMISSIONS = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'https://app.thanhlapcongtyonline.vn']

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
    this.onLoadRouter()
    this.onLoadSourceHTML()
    this.onHandlerError()
  }

  onLoadConfig = () => {
    this.app.use(express.json())

    this.app.use(cookieParser())
  }

  onLoadUploadConfigs = () => {
    this.app.use('/public', cors(corsOptions), express.static(path.join(global.__basedir, 'uploads')))

    this.app.use('/robots.txt', (req, res) => {
      let robotFile = path.join(global.__basedir, 'uploads', 'robots.txt')
      res.sendFile(robotFile)
    })
  }
  onLoadRouter = () => {
    this.app.use('/git', GitRouter)

    this.app.use('/api', cors(corsOptions), AppRouter)
  }

  onLoadSourceHTML = () => {
    this.app.use(express.static(path.join(global.__basedir, 'dist')))

    if (NODE_ENV !== 'development') {
      this.app.get('/*', cors(corsOptions), (req, res) => {
        res.sendFile(path.join(global.__basedir, 'dist', 'index.html'))
      })
    }
  }
  onHandlerError = () => {
    this.app.use((err, req, res, next) => {
      res.status(500).send({
        error: err.stack,
        message: 'Internal Server Error',
      })
    })
  }
}
