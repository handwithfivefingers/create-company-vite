import axios from '@/config/axios'

const api_path = {
  createOrder: '/order/create',
  createOrderWithPayment: '/order/create/payment',
  products: `/product`,
  checkCompany: '/service/search',
  categories: '/category',
}

const ProductService = {
  createOrder: (form) => axios.post(api_path.createOrder, form),

  createOrderWithPayment: (form) => axios.post(api_path.createOrderWithPayment, form),

  getDataBySlug: (params) => axios.get(`${api_path.products}/${params.slug}`),

  getCategoryBySlug: (params) => axios.get(api_path.categories + '/' + params.slug),

  getProduct: (params) => {
    return axios.get(api_path.products, {
      params,
    })
  },

  checkCompany: (params) => axios.post(api_path.checkCompany, params),
}

export default ProductService
