import axios from '../../config/axios'

const api_path = {
  order: '/order',
  payment: '/payment',
  career: '/career',
  transaction: '/order/payment',
}

const OrderService = {
  getOrders: () => axios.get(api_path.order),
  Payment: (params) => axios.post(api_path.payment, params),
  getOrderById: (id) => axios.get(api_path.order + '/' + id),
  deleteOrder: (id) => axios.delete(api_path.order + '/' + id),
  createTransaction: (params) => axios.post(api_path.transaction, params),
}

export default OrderService
