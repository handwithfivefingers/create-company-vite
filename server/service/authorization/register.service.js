const shortid = require('shortid')
const { User, OTP } = require('../../model')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../../common/helper')

module.exports = class RegiserService {
  registerUser = async (req, res) => {
    try {
      const { phone, email, otp, deleteOldUser } = req.body

      const isOTPValid = await OTP.findOne({ phone, email, otp, delete_flag: 0 })

      const _userExist = await User.find({ email, delete_flag: 0 })

      if (_userExist.length && _userExist.some((user) => user.phone !== phone)) {
        throw { message: 'Email đã có người đăng kí, vui lòng thử email khác' }
      }

      if (!isOTPValid) throw { message: 'Mã xác thực không chính xác' }

      if (deleteOldUser) {
        await this.handleDeleteUserBeforeRegister({ phone, email })
      }

      var password = Math.random().toString(36).slice(-8)

      const hash_password = await bcrypt.hash(password, 10)

      let userName = shortid()

      const _obj = new User({
        phone,
        email,
        hash_password,
        name: userName,
      })

      const _save = await _obj.save()

      const { role, _id, updatedAt } = _save

      let _tokenObj = { _id, role, updatedAt }

      await generateToken(_tokenObj, res)

      // let mailParams = await this.getMailParams({ name: userName, phone, password, role, email: _save.email }, res)

      // await sendmailWithAttachments(req, res, mailParams)

      return {
        role,
        message: 'Đăng kí thành công',
      }
    } catch (err) {
      console.log('Register Error', err)
      throw err
    }
  }

  handleDeleteUserBeforeRegister = async ({ phone, email }) => {
    try {
      await User.updateOne(
        {
          phone,
          email,
          delete_flag: 0,
        },
        {
          delete_flag: 1,
        },
      )
      return true
    } catch (error) {
      return false
    }
  }
}
