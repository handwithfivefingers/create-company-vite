import axios from '../../config/axios'

const api_path = {
  products: '/admin/product',

  categories: '/admin/category',

  career: '/admin/career',

  careerCate: '/admin/career_cate',
}

const AdminProductService = {

  getProduct: () => axios.get(api_path.products),

  updateProduct: ({ _id, ...form }) => axios.post(`${api_path.products}/${_id}`, form),

  createProduct: (params) => axios.post(api_path.products, params),

  deleteProduct: ({ _id }) => axios.delete(api_path.products + '/' + _id),

  getCategory: () => axios.get(api_path.categories),

  updateCategories: ({ _id, ...form }) => axios.post(api_path.categories + '/' + _id, form),

  createCategory: (params) => axios.post(api_path.categories, params),

  deleteCate: (_id) => axios.delete(api_path.categories + '/' + _id),

  getCareer: () => axios.get(api_path.career),

  createCareer: (form) => axios.post(api_path.career, form),

  updateCareer: ({ id, ...form }) => axios.post(api_path.career + '/' + id, form),

  deleteCareer: (id) => axios.delete(`${api_path.career}/${id}`),

  getCareerCategory: () => axios.get(api_path.careerCate),

  createCareerCategory: (form) => axios.post(api_path.careerCate, form),

  getSingleCareerCategory: (id) => axios.get(api_path.careerCate + '/' + id),

  updateCareerCategory: ({ id, ...form }) => axios.post(api_path.careerCate + '/' + id, form),

  deleteCareerCategory: (id) => axios.delete(api_path.careerCate + '/' + id),
}

export default AdminProductService
