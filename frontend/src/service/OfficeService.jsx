import axios from '../config/axios'

const api_path = {
  office: '/admin/office',
}

const OfficeServices = {
  getListsFiles: (params) => {
    return axios.get(api_path.office + '/files', { params })
  },
  getBrowserToken: (params) => {
    return axios.post(api_path.office + '/browser-token', params)
  },
}

export default OfficeServices
