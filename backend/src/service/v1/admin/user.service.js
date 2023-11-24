const { User } = require('../../../model')
const BaseAdminService = require('../../../common/baseService')

module.exports = class UserService extends BaseAdminService {
  PAGE_SIZE = 10

  getUser = async (req) => {
    try {
      const { page, ...condition } = req.body

      let current_page = (parseInt(page) - 1) * this.PAGE_SIZE

      let _user = await User.find({ delete_flag: { $ne: 1 }, _id: { $ne: req.id } })
        .select('-hash_password')
        .skip(current_page)
        .limit(this.PAGE_SIZE)
        .sort('-createdAt')

      let count = await User.find({ delete_flag: { $ne: 1 }, _id: { $ne: req.id } }).countDocuments()
      return { _user, count, current_page: page || 1 }
    } catch (e) {
      throw e
    }
  }

  deleteUser = async (req) => {
    try {
      let { id } = req.params
      let _user = await User.findOneAndUpdate({ _id: id }, { delete_flag: 1 })

      return _user
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
