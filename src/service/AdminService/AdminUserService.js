import axios from "../../config/axios";

const api_path = {
  getUser: "/admin/user",
  deleteUser:"/admin/delete",
};

const AdminUserService = {
  getUser: (params) => {
    return axios.post(api_path.getUser, params);
  },
  deleteUser: (id) => {
    return axios.post(`${api_path.deleteUser}/${id}`);
  },
};

export default AdminUserService;
