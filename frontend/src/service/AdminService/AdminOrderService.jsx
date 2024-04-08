import axios from '@/config/axios'

const api_path = {
  order: '/admin/order',
  deleteOrder: '/admin/order',
  previewFileOrder: '/admin/order/preview',
}

const AdminOrderService = {
  getOrder: (params) => {
    return axios.get(api_path.order, params)
  },

  getOrderBySlug: (params) => {
    return axios.get(`${api_path.order}/${params.slug}`)
  },

  deleteOrder: (id) => {
    return axios.delete(api_path.deleteOrder + '/' + id)
  },
  previewFileOrder: (id) => {
    return axios.get(api_path.previewFileOrder + '/' + id)
  },
  onConvertManual: (id) => {
    return axios.post(api_path.order + '/' + id)
  },
}

export default AdminOrderService
