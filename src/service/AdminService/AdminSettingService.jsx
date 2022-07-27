import axios from "@/config/axios";

const api_path = {
  getSetting: "/admin/email/setting",
  updateSetting: "/admin/email/setting",
};

const AdminSettingService = {
  getSetting: () => {
    return axios.get(api_path.getSetting);
  },
  updateSetting: (params) => {
    return axios.post(api_path.updateSetting, params);
  },
};

export default AdminSettingService;
