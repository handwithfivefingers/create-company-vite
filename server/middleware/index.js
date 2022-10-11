const jwt = require('jsonwebtoken')
const shortid = require('shortid')

const path = require('path')
const multer = require('multer')
const { authFailedHandler, errHandler } = require('@response')
const { User } = require('../model')

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
    let remoteAddress = req.socket['remoteAddress']
    // let originalUrl = req.socket['originalUrl']
    console.log(host, req.originalUrl, remoteAddress)
  } catch (err) {
  } finally {
    next()
  }
}

module.exports = {
  upload,
  requireSignin,
  TrackingApi,
}
