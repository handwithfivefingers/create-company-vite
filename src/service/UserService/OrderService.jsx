import axios from '../../config/axios';

const api_path = {
  getOrders: '/order',
  payment: '/payment',
};

const OrderService = {
  getOrders: () => {
    return axios.get(api_path.getOrders);
  },
  Payment: (params) => {
    return axios.post(api_path.payment, params);
  },
};

export default OrderService;
