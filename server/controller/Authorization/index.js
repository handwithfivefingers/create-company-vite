const { User, Setting, OTP, TemplateMail } = require('../../model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { loginFailed, createdHandler, errHandler, existHandler, successHandler } = require('../../response')
const MailService = require('@server/controller/user/Sendmail')
const otpGenerator = require('otp-generator')

const { OAuth2Client } = require('google-auth-library')
const axios = require('axios')

const { sendmailWithAttachments } = new MailService()

const { GG_EMAIL_CLIENT_ID: CLIENT_ID } = process.env

const client = new OAuth2Client(CLIENT_ID)
module.exports = class Authorization {
  constructor() {}

  registerUser = async (req, res) => {
    try {
      let _user = await User.findOne({
        $and: [{ email: req.body.email }, { phone: req.body.phone }, { delete_flag: { $ne: 1 } }],
      })

      let message = _user?.phone === req.body.phone ? 'Phone' : 'Email' // if have user -> check mail or phone

      if (_user) return existHandler(res, message)

      const { phone, name, email } = req.body

      var password = Math.random().toString(36).slice(-8)

      const hash_password = await bcrypt.hash(password, 10)

      const _obj = new User({
        phone,
        name,
        email,
        hash_password,
      })

      const _save = await _obj.save()

      const { email: _email, role, _id } = _save

      let _tokenObj = { _id, role }

      await this.generateToken(_tokenObj, res)

      let mailParams = await this.getMailParams({ name, phone, password, role, email: _email }, res)

      // console.log("mailParams", mailParams);

      await sendmailWithAttachments(req, res, mailParams)

      return res.status(201).json({
        role,
        message: 'Đăng kí thành công',
      })
    } catch (err) {
      console.log('Register Error')
      return errHandler(err, res)
    }
  }

  LoginUser = async (req, res) => {
    try {
      // let { credential } = req.body
      let { type } = req.body

      if (type === 'google') return this.LoginWithGoogle(req, res)

      const response = await User.findOne({ phone: req.body.phone })

      if (response) {
        const auth = await response.authenticate(req.body.password)

        console.log(response)
        if (auth) {
          let _tokenObj = { _id: response._id, role: response.role, updatedAt: response.updatedAt }

          await this.generateToken(_tokenObj, res)

          let newData = {
            _id: response._id,
            name: response.name,
            email: response.email,
            phone: response.phone,
            role: response.role,
          }

          return res.status(200).json({
            data: newData,
            authenticate: true,
            callbackUrl: `/${newData.role}`,
          })
        }
      }
      return loginFailed(res)
    } catch (err) {
      console.log('LoginUser error', err)
      return errHandler(err, res)
    }
  }

  LoginWithGoogle = async (req, res) => {
    try {
      let { clientId, credential, type } = req.body

      if (type !== 'google') throw 'error type Login'

      if (CLIENT_ID !== clientId) throw 'ClientID didnt match'

      const urlGG = `https://oauth2.googleapis.com/tokeninfo`

      let { data } = await axios.get(urlGG, {
        params: {
          id_token: credential,
        },
      })
      // console.log(data)
      if (!data) throw { message: 'Token invalid' }
      if (!data.email) throw { message: 'User not valid' }

      let _user = await User.findOne({
        email: data.email,
      })

      let _tokenObj

      let newData

      if (!_user) {
        // register
        let _userCreated = await this.createUserFromGoogle(data)

        _tokenObj = { _id: _userCreated._id, role: _userCreated.role, updatedAt: _userCreated.updatedAt }

        newData = {
          role: _userCreated.role,
        }
      } else {
        // console.log('have user', _user)
        if (!_user.google.sub || _user.google.sub !== data.sub) {
          _user.google = { ...data }
          await _user.save()
        }

        _tokenObj = { _id: _user._id, role: _user.role, updatedAt: _user.updatedAt }

        newData = {
          role: _user.role,
        }
      }

      await this.generateToken(_tokenObj, res)

      return res.status(200).json({
        data: newData,
        authenticate: true,
        callbackUrl: `/${newData.role}`,
      })
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  createUserFromGoogle = async (user) => {
    try {
      var password = Math.random().toString(36).slice(-8)
      const hash_password = await bcrypt.hash(password, 10)

      let _userObj = new User({
        phone: user.sub,
        name: user.name,
        email: user.email,
        hash_password,
        google: {
          ...user,
        },
      })

      await _userObj.save()

      return _userObj
    } catch (error) {
      throw { message: 'Create user failed', error: error }
    }
  }

  Logout = async (req, res) => {
    res.clearCookie('sessionId')
    res.status(200).json({
      authenticate: false,
    })
  }

  Authenticate = async (req, res) => {
    return res.status(200).json({
      authenticate: true,
      role: req.role,
    })
  }

  ForgotPassword = async (req, res) => {
    try {
      let { email } = req.body
      console.log('Forgot Password', email)
      // if (!email) throw { message: 'Email is required' }

      // await OTP.deleteMany({})

      let _user = await User.findOne({ email })

      if (!_user) throw { message: 'User does not exist' }

      await OTP.deleteMany({ email })

      let otpObj = new OTP({
        otp: this.generateOTP(),
        email,
      })

      let { name, content, subject } = await this.getTemplateMail('mailForgotPass')

      // console.log(mailObj)

      await otpObj.save()

      // try to send mail

      // let mailParams = mailObj.replace('{otp}', otpObj.otp)

      // mailParams.email = _user.email

      // console.log(name, content, subject)

      let BASE_URL = process.env.NODE_ENV !== 'development' ? process.env.VITE_BASEHOST_PROD : 'http://localhost:3003'
      let mailParams = {
        email: _user.email,
        content: content.replace('{name}', _user.name).replace('{otp}', otpObj.otp).replace('{link}', `${BASE_URL}/forgot-password?step=2&email=${_user.email}`),
        subject,
        type: 'any',
      }

      await sendmailWithAttachments(req, res, mailParams)

      return successHandler({ message: 'OTP successfully registered' }, res)
    } catch (error) {
      console.log('ForgotPassword', error)

      return errHandler(error, res)
    }
  }

  ValidateOTP = async (req, res) => {
    try {
      let { email, otp } = req.body

      if (!otp) throw { message: 'Invalid OTP' }

      let _user = await OTP.findOne({ email: email })

      console.log('ValidateOTP', email, otp, _user)

      if (!_user) throw { message: 'OTP Expired' }

      let _userOTP = _user.otp

      let isOTPValid = String(_userOTP) === String(otp)

      if (!isOTPValid) throw { message: 'Invalid OTP' }

      res.sendStatus(200)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  ResetPassword = async (req, res) => {
    try {
      let { password, confirm_password, email, otp } = req.body

      if (password !== confirm_password) throw { message: 'Invalid password' }

      let [_user] = await User.aggregate([
        {
          $match: {
            email: req.body.email,
          },
        },
        {
          $lookup: {
            from: 'otps',
            localField: 'email',
            foreignField: 'email',
            as: 'otp',
          },
        },
        { $unwind: { path: '$otp' } }, // Extract array to Object
      ])

      let isOTPValid = _user?.otp?.otp === otp || false

      if (!isOTPValid) throw { message: 'OTP invalid' }

      const hash_password = await bcrypt.hash(password, 10)

      await User.updateOne({ _id: _user._id }, { hash_password: hash_password })

      await OTP.deleteOne({ email: email })

      return successHandler('Change Password success', res)
    } catch (error) {
      console.log(error)

      return errHandler(error, res)
    }
  }

  generateOTP = () => {
    return otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
  }

  generateToken = async (obj, res) => {
    const token = await jwt.sign(obj, process.env.SECRET, {
      expiresIn: process.env.EXPIRE_TIME,
    })
    var hour = 3600000

    res.cookie('sessionId', token, {
      maxAge: 2 * 24 * hour,
      httpOnly: true,
    })
  }

  getMailParams = async ({ name, phone, password, role, email }, res) => {
    try {
      let _setting = await Setting.find().populate('mailRegister mailPayment')

      let mailParams = {
        phone,
        email,
        role,
        type: 'any',
      }

      if (_setting) {
        let { mailRegister } = _setting[0]

        let { subject, content } = mailRegister

        mailParams.content = content.replace('{name}', name).replace('{phone}', phone).replace('{password}', password)
        mailParams.subject = subject
      } else {
        mailParams.content = `Chào ${name}, <br/>Tên đăng nhập của bạn là: ${phone}<br/>Mật khẩu của bạn là : ${password}`
        mailParams.subject = 'Create user Successfully'
      }

      return mailParams
    } catch (err) {
      // throw err;
      return errHandler(err, res)
    }
  }

  getTemplateMail = async (template) => {
    try {
      let [_setting] = await Setting.find().populate(`${template}`, '-updatedAt -createdAt -_id -__v')
      return _setting[template]
    } catch (error) {
      throw error
    }
  }
}
