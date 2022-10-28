const jwt = require('jsonwebtoken')
const shortid = require('shortid')

const path = require('path')
const multer = require('multer')
const { authFailedHandler, errHandler } = require('@response')
const { User, Log } = require('../model')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(global.__basedir), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  },
})

const upload = multer({ storage })

const requireSignin = async (req, res, next) => {
  try {
    let token = req.cookies['sessionId']

    if (!token) throw { message: 'Authorization required' }

    const decoded = await jwt.verify(token, process.env.SECRET)

    if (decoded) {
      let { _id, role, updatedAt } = decoded

      let _user = await User.findOne({ _id })

      if (new Date(_user.updatedAt).getTime() !== new Date(updatedAt).getTime()) throw { message: 'Token Expired' }

      const newToken = jwt.sign({ _id, role, updatedAt }, process.env.SECRET, {
        expiresIn: process.env.EXPIRE_TIME,
      })

      req.role = decoded.role

      req.id = decoded._id

      var hour = 3600000

      res.cookie('sessionId', newToken, {
        maxAge: 2 * 24 * hour,
        httpOnly: true,
      })

      next()
    }
  } catch (err) {
    // authFailedHandler(res)
    res.clearCookie()
    return authFailedHandler(res)
    // return errHandler(err, res)
  }
}

const TrackingApi = async (req, res, next) => {
  try {
    // console.log(req)
    let host = req.headers['host']
    let remoteAddress =
      req.headers['x-forwarded-for'] ||
      req.id ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    // let originalUrl = req.socket['originalUrl']
    console.log(host, req.originalUrl, remoteAddress)
  } catch (err) {
  } finally {
    next()
  }
}

const validateIPNVnpay = async (req, res, next) => {
  const SANDBOX_WHITE_LIST = ['113.160.92.202']
  const PRODUCT_WHITE_LIST = [
    '113.52.45.78',
    '116.97.245.130',
    '42.118.107.252',
    '113.20.97.250',
    '203.171.19.146',
    '103.220.87.4',
  ]

  const TEST_IP = ['127.0.0.1', '10.0.14.235', '10.0.12.251']

  let validIps = ['127.0.0.1', ...TEST_IP, ...SANDBOX_WHITE_LIST, ...PRODUCT_WHITE_LIST] // Put your IP whitelist in this array

  const IPV4_PREFIX = '::ffff:'

  var ipAddr =
    // req.headers['x-forwarded-for'] ||
    req.id || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress

  const isIPV4 = ipAddr.includes(IPV4_PREFIX)

  if (isIPV4) {
    ipAddr = ipAddr?.replace(IPV4_PREFIX, '')
  }

  if (validIps.includes(ipAddr)) {
    const type = SANDBOX_WHITE_LIST.includes(ipAddr)
      ? 'sandbox'
      : PRODUCT_WHITE_LIST.includes(ipAddr)
      ? 'production'
      : TEST_IP.includes(ipAddr)
      ? 'dev'
      : ''
    let _logObject = {
      ip: ipAddr,
      type,
      data: {
        ...req.query,
      },
    }

    let _log = new Log(_logObject)

    await _log.save()

    next()
  } else {
    console.log('Bad IP: ' + ipAddr)

    return res.status(403).json({ message: 'You are not allowed to access' })
  }
}

module.exports = {
  upload,
  requireSignin,
  TrackingApi,
  validateIPNVnpay,
}
