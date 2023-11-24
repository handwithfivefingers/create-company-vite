const { User } = require('../../../model')

module.exports = class ProfileService {
  constructor() {}

  onHandleGetProfile = async (req, res) => {
    try {
      const _user = await User.findOne({ _id: req.id }).select('-hash_password -role -delete_flag')
      return _user
    } catch (error) {
      console.log('Profile Service onHandleGetProfile error ::: ', error)
      throw error
    }
  }
  onHandleUpdateProfile = async (req, res) => {
    try {
      const { email, phone, name } = req.body

      await User.updateOne({ _id: req.params._id }, { email, phone, name }, { new: true })

      return true
    } catch (error) {
      throw error
    }
  }
  onHandleChangePassword = async (req, res) => {
    try {
      let { old_password, new_password, confirm_password } = req.body

      if (!old_password) throw { message: 'Password must be filled' }

      if (new_password !== confirm_password) throw { message: 'confirm password doesnt match' }

      let _user = await User.findOne({ _id: req.id })

      let isPassword = await _user.authenticate(old_password)

      if (isPassword) {
        const hash_password = await bcrypt.hash(new_password, 10)

        await User.findOneAndUpdate({ _id: _user._id }, { hash_password }, { new: true })

        return {
          message: 'Change Password success',
        }
      }

      throw { message: 'Password doesnt correct, please try again !' }
    } catch (err) {
      console.log('Profile Service changePassword error', error)
      throw err
    }
  }
}
