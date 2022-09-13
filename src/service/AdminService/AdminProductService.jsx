import axios from '../../config/axios'

const api_path = {
  getProducts: '/product',
  createProducts: '/product/create',
  editProducts: '/product/edit',
  deleteProducts: '/product',
  getCategories: '/admin/category',
  // updateCategories: '/admin/category/update',
  // createCategories: '/admin/category/create',

  categories: '/admin/category',

  career: '/career',

  careerCate: '/career_cate',
}

const AdminProductService = {
  getProduct: () => {
    return axios.get(api_path.getProducts)
  },
  editProduct: (params) => {
    return axios.post(`${api_path.editProducts}/${params._id}`, params)
  },
  createProduct: (params) => {
    return axios.post(api_path.createProducts, params)
  },
  deleteProduct: (params) => {
    return axios.delete(`${api_path.deleteProducts}/${params._id}`, params)
  },

  getCategory: () => axios.get(api_path.categories),

  updateCategories: ({ _id, ...form }) => axios.post(api_path.categories + '/' + _id, form),

  createCategory: (params) => axios.post(api_path.categories, params),

  deleteCate: (_id) => axios.delete(api_path.categories + '/' + _id),

  getCareer: () => {
    return axios.get(api_path.career)
  },
  createCareer: (form) => {
    return axios.post(api_path.career, form)
  },
  updateCareer: ({ id, ...form }) => {
    return axios.post(api_path.career + '/' + id, form)
  },
  deleteCareer: (id) => {
    return axios.delete(`${api_path.career}/${id}`)
  },

  getCareerCategory: () => {
    return axios.get(api_path.careerCate)
  },
  createCareerCategory: (form) => {
    return axios.post(api_path.careerCate, form)
  },
  getSingleCareerCategory: (id) => {
    return axios.get(api_path.careerCate + '/' + id)
  },
  updateCareerCategory: ({ id, ...form }) => {
    return axios.post(api_path.careerCate + '/' + id, form)
  },
  deleteCareerCategory: (id) => {
    return axios.delete(api_path.careerCate + '/' + id)
  },
}

export default AdminProductService
