import axios from "../config/axios";

const api_path = {
  getProducts: "/product",
  getCategories: "/category",
};

const ProductService = {
  getProducts: () => {
    return axios.get(api_path.getProducts);
  },
  getCategories: () => {
    return axios.get(api_path.getCategories);
  },
};

export default ProductService;
