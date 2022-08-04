import axios from '@/config/axios'

const api_path = {
  create_company: '/order/create',
  createCompanyWithPayment: '/order/create/payment',
  getDataBySlug: `/product`,
  checkCompany: '/product/company-search',
}

const ProductService = {
  createCompany: (form) => {
    return axios.post(api_path.create_company, form)
  },
  createCompanyWithPayment: (form) => {
    return axios.post(api_path.createCompanyWithPayment, form)
  },
  getDataBySlug: (params) => {
    return axios.get(`${api_path.getDataBySlug}/${params.slug}`)
  },
  checkCompany: (params) => {
    return axios.post(api_path.checkCompany, params)
  },
}

export default ProductService
