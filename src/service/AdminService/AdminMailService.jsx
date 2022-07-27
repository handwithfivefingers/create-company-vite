import axios from "@/config/axios";

const api_path = {
  getTemplate: "/admin/template",
  deleteTemplate: "/admin/template/delete",
  addTemplate: "/admin/template",
  editTemplate: "/admin/template/edit",
};

const AdminMailService = {
  getTemplate: (params) => {
    return axios.get(api_path.getTemplate, { params });
  },
  addTemplate: (params) => {
    return axios.post(api_path.addTemplate, params);
  },
  editTemplate: (params) => {
    return axios.post(`${api_path.editTemplate}/${params._id}`, params);
  },
  deleteTemplate: (id) => {
    return axios.post(`${api_path.deleteTemplate}/${id}`);
  },
};

export default AdminMailService;
