import axios from '@/config/axios'

const api_path = {
  template: '/admin/template',
}

const AdminMailService = {
  getTemplate: (params) => {
    return axios.get(api_path.template, { params })
  },
  addTemplate: (params) => {
    return axios.post(api_path.template, params)
  },
  editTemplate: (params) => {
    return axios.post(`${api_path.template}/${params._id}`, params)
  },
  deleteTemplate: (id) => {
    return axios.delete(`${api_path.template}/${id}`)
  },
}

export default AdminMailService
