const jwt = require('jsonwebtoken')
const { authFailedHandler, errHandler } = require('../response')
const { User, Log } = require('../model')
const apicache = require('apicache')
const VNPWHITELIST = require('../constant/VnpayWhitelist')

const requireSignin = async (req, res, next) => {
  try {
    let token = req.cookies['sessionId']

    // console.log(token)
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
    // let host = req.headers['host']
    let remoteAddress =
      req.headers['x-forwarded-for'] ||
      req.id ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
    console.log('--->', req.originalUrl, remoteAddress)
    req.remoteAddress = remoteAddress
  } catch (err) {
  } finally {
    next()
  }
}

const validateIPNVnpay = async (req, res, next) => {
  let WHITE_LIST = VNPWHITELIST // Put your IP whitelist in this array

  if (process.env.NODE_ENV === 'development') {
    WHITE_LIST = [...WHITE_LIST, '127.0.0.1']
  }

  let remoteAddress =
    req.headers['x-forwarded-for'] ||
    req.id ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  // const type = SANDBOX_WHITE_LIST.includes(remoteAddress)
  //   ? 'sandbox'
  //   : PRODUCT_WHITE_LIST.includes(remoteAddress)
  //   ? 'production'
  //   : ''

  let _logObject = {
    ip: remoteAddress,
    // type,
    data: {
      ...req.query,
    },
  }

  if (WHITE_LIST.includes(remoteAddress)) {
    let _log = new Log(_logObject)
    await _log.save()
    next()
  } else {
    // console.log('Bad IP: ' + remoteAddress)
    return res.status(403).json({ message: 'You are not allowed to access' })
  }
}

module.exports = {
  requireSignin,
  TrackingApi,
  validateIPNVnpay,
  ...require('./limit'),
}
