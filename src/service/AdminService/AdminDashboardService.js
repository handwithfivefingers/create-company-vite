import axios from "@/config/axios";

const api_path = {
  getLogs: "/admin/logs",
  testPayment: "/payment",
};

const AdminDashboardService = {
  getLogs: () => {
    return axios.get(api_path.getLogs);
  },
  testPayment: (params) => {
    return axios.post(api_path.testPayment, params);
  },
};

export default AdminDashboardService;
