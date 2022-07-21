import axios from "../../config/axios";

const api_path = {
  getUser: "/admin/user",
  deleteUser:"/admin/delete",
};

const AdminUserService = {
  getUser: () => {
    return axios.get(api_path.getUser);
  },
  deleteUser: (id) => {
    return axios.post(`${api_path.deleteUser}/${id}`);
  },
};

export default AdminUserService;
