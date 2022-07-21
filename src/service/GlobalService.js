import axios from "../config/axios";

const api_path = {
  fetchCareer: "/nganhnghe",
  sendMail: "/sendmail",
};

const GlobalService = {
  fetchCareer: () => {
    return axios.get(api_path.fetchCareer);
  },
  sendMail: (form) => {
    return axios.post(api_path.sendMail, form);
  },
};

export default GlobalService;
