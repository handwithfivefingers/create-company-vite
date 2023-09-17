import axios from '../../config/axios'

const api_path = {
  getOrder: '/order',
  payment: '/payment',
  career: '/career',
}

const OrderService = {
  getOrders: () => {
    return axios.get(api_path.getOrder)
  },
  Payment: (params) => {
    return axios.post(api_path.payment, params)
  },
  getOrderById: (id) => axios.get(api_path.getOrder + '/' + id),
  deleteOrder: (id) => axios.delete(api_path.getOrder + '/' + id),
}

export default OrderService
