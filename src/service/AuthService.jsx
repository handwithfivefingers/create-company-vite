import axios from "../config/axios";

const api_path = {
  register: "/register",
  getSession: "/auth/session",
  login: "/login",
};

const AuthService = {
  onRegister: (form) => {
    return axios.post(api_path.register, form);
  },
  getSession: () => {
    return axios.get(api_path.getSession);
  },
  onLogin: (form) => {
    return axios.post(api_path.login, form);
  },
};

export default AuthService;
