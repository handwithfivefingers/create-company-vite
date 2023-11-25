import axios from '../../config/axios'

const api_path = {
  profile: '/user/profile',
  changePassword: '/user/profile/password',
}

const ProfileService = {
  getProfile: () => {
    return axios.get(api_path.profile)
  },
  changeProfile: ({ _id, ...form }) => {
    return axios.post(api_path.profile + '/' + _id, form)
  },
  changePassword: (form) => {
    return axios.post(api_path.changePassword, form)
  },
}

export default ProfileService
