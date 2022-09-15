import axios from '@/config/axios'

const api_path = {
  createOrder: '/order/create',
  createOrderWithPayment: '/order/create/payment',
  products: `/product`,
  checkCompany: '/product/company-search',
}

const ProductService = {
  createOrder: (form) => {
    return axios.post(api_path.createOrder, form)
  },

  createOrderWithPayment: (form) => {
    return axios.post(api_path.createOrderWithPayment, form)
  },

  getDataBySlug: (params) => {
    return axios.get(`${api_path.products}/${params.slug}`)
  },

  getProduct: (params) => {
    return axios.get(api_path.products, {
      params,
    })
  },

  checkCompany: (params) => {
    return axios.post(api_path.checkCompany, params)
  },
}

export default ProductService
