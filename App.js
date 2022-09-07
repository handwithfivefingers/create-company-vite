const express = require('express')

const env = require('dotenv')

const app = express()

const path = require('path')

const mongoose = require('mongoose')

const cors = require('cors')

const AppRouter = require('./server/route')

const GitRouter = require('./server/route/v1/git')

const cookieParser = require('cookie-parser')

const { task } = require('./server/controller/Service/cronjob')

env.config()

const { NODE_ENV, PORT, DEV_PORT } = process.env

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 1 // Conflict ssl

const RUNTIME_PORT = NODE_ENV === 'development' ? DEV_PORT || 3001 : PORT

const mongoseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

// DB
const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DATABASE_URL, mongoseOptions)
    if (db.connections) console.log('DB connected')
  } catch (err) {
    console.log('db error connection', err)
  }
}

// middleware

app.use(express.json())

app.use(cookieParser())

//config cors
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'https://app.thanhlapcongtyonline.vn'],
}

global.__basedir = __dirname

// Routes middleware

app.use('/public', cors(corsOptions), express.static(path.join(__dirname, 'uploads')))

app.use(express.static(path.join(__dirname, 'dist')))

app.use('/git', GitRouter)

app.use('/api', cors(corsOptions), AppRouter)

app.use('/robots.txt', (req, res) => {
  let robotFile = path.join(__dirname, 'uploads', 'robots.txt')
  res.sendFile(robotFile)
})

if (NODE_ENV !== 'development') {
  app.get('/*', cors(corsOptions), (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

// Handling 500
app.use((err, req, res, next) => {
  res.status(500).send({
    error: err.stack,
    message: 'Internal Server Error',
  })
})

// Cron running ;

app.listen(RUNTIME_PORT, async () => {
  await connectDB()

  if (process.env.NODE_ENV !== 'development') {
    task.start()
  }

  console.log(`Server is running ${RUNTIME_PORT}`)
})
