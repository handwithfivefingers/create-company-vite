const { successHandler, errHandler } = require('../../../response')
const ProfileService = require('../../../service/v1/user/profile.service')
module.exports = class ProfileController {
  onGetUser = async (req, res) => {
    try {
      const data = await new ProfileService().onHandleGetProfile(req, res)

      return successHandler(data, res)
    } catch (error) {
      return errHandler(e, res)
    }
  }
  onUpdateProfile = async (req, res) => {
    try {
      const data = await new ProfileService().onHandleUpdateProfile(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  onChangePassword = async (req, res) => {
    try {
      return successHandler({ message: 'Permission not allow' }, res)
    } catch (error) {
      return errHandler(e, res)
    }
  }
}
