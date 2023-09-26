import axios from '@/config/axios'

const api_path = {
  getOrder: '/admin/order',
  deleteOrder: '/admin/order',
}

const AdminOrderService = {
  getOrder: (params) => {
    return axios.get(api_path.getOrder, params)
  },
  
  getOrderBySlug: (params) => {
    return axios.get(`${api_path.getOrder}/${params.slug}`)
  },

  deleteOrder: (id) => {
    return axios.delete(api_path.deleteOrder + '/' + id)
  },
}

export default AdminOrderService
