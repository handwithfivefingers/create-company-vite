import axios from '../../config/axios';

const api_path = {
  getProducts: '/product',
  createProducts: '/product/create',
  editProducts: '/product/edit',
  deleteProducts: '/product',
  getCategories: '/admin/category',
  updateCategories: '/admin/category/update',
  createCategories: '/admin/category/create',
  getCareer: '/nganhnghe',
  createCareer: '/nganhnghe',
  deleteCareer: '/nganhnghe/delete',
};

const AdminProductService = {
  getProduct: () => {
    return axios.get(api_path.getProducts);
  },
  editProduct: (params) => {
    return axios.post(`${api_path.editProducts}/${params._id}`, params);
  },
  createProduct: (params) => {
    return axios.post(api_path.createProducts, params);
  },
  deleteProduct: (params) => {
    return axios.delete(`${api_path.deleteProducts}/${params._id}`, params);
  },
  getCategory: () => {
    return axios.get(`${api_path.getCategories}`);
  },
  updateCategories: (params) => {
    return axios.post(`${api_path.updateCategories}/${params._id}`, params);
  },
  createCategory: (params) => {
    return axios.post(`${api_path.createCategories}`, params);
  },
  getCareer: () => {
    return axios.get(api_path.getCareer);
  },
  createCareer: (form) => {
    return axios.post(api_path.createCareer, form);
  },
  deleteCareer: (id) => {
    return axios.post(`${api_path.deleteCareer}/${id}`);
  },
};

export default AdminProductService;
