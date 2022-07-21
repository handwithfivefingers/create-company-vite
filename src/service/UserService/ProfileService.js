import axios from "../../config/axios";

const api_path = {
  getProfile: "/user/profile",
  changeProfile: "/user/profile/update",
  changePassword: "/user/profile/password",
};

const ProfileService = {
  getProfile: () => {
    return axios.get(api_path.getProfile);
  },
  changeProfile: (form) => {
    return axios.post(api_path.changeProfile, form);
  },
  changePassword: (form) => {
    return axios.post(api_path.changePassword, form);
  },
};

export default ProfileService;
