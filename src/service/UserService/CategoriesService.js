import axios from "../../config/axios";

const api_path = {
  getProducts: "/product",
  getCategories: "/category",
};

const CategoryService = {
  getProducts: () => {
    return axios.get(api_path.getProducts);
  },
  getCategories: () => {
    return axios.get(api_path.getCategories);
  },
};

export default CategoryService;
