import axios from '@/config/axios'

const api_path = {
  emailSetting: '/admin/setting',
}

const AdminSettingService = {
  getSetting: () => {
    return axios.get(api_path.emailSetting)
  },
  updateSetting: (params) => {
    return axios.post(api_path.emailSetting, params)
  },
}

export default AdminSettingService
