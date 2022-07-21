import axios from '@/config/axios';

const api_path = {
  create_company: '/order/create',
  createCompanyWithPayment: '/order/create/payment',
  getDataBySlug: `/product`,
};

const ProductService = {
  createCompany: (form) => {
    return axios.post(api_path.create_company, form);
  },
  createCompanyWithPayment: (form) => {
    return axios.post(api_path.createCompanyWithPayment, form);
  },
  getDataBySlug: (params) => {
    return axios.get(`${api_path.getDataBySlug}/${params.slug}`);
  },
};

export default ProductService;
