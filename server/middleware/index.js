const jwt = require('jsonwebtoken')
const shortid = require('shortid')

const path = require('path')
const multer = require('multer')
const { authFailedHandler, errHandler } = require('@response')
const { User } = require('../model')

// const cloudinary = require("cloudinary").v2;

// const apiKey = "oOhO32uMsnxj4biMWhb9bU88SZc";

// cloudinary.config({
//   cloud_name: "dojswen0t",
//   api_key: "776779258413574",
//   api_secret: "oOhO32uMsnxj4biMWhb9bU88SZc",
// });

// const signuploadform = () => {
//   const timestamp = Math.round(new Date().getTime() / 1000);
//   const signature = cloudinary.utils.api_sign_request(
//     {
//       timestamp: timestamp,
//       eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
//       folder: "song_files",
//     },
//     apiKey,
//   );
//   return { timestamp, signature };
// };

// exports.getSignCloud = async (req, res) => {
//   // function handle token
//   const sig = signuploadform();
//   console.log(sig);
//   res.status(200).json({
//     signature: sig.signature,
//     timestamp: sig.timestamp,
//     cloudname: "dojswen0t",
//     apikey: "776779258413574",
//   });
// };

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

const convertString = (str) => {
  return (
    str
      ?.normalize('NFD')
      ?.replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D') || str
  )
}

module.exports = {
  upload,
  requireSignin,
  convertString,
  TrackingApi,
}
