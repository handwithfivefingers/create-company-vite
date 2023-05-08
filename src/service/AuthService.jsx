import axios from '../config/axios'

const api_path = {
  register: '/register',
  getSession: '/auth/session',
  loginOTP: '/login-otp',
  login: '/login',
  forgotPassword: '/forgot-password',
  checkOtp: '/check-otp',
  resetPassword: '/reset-password',
}

const AuthService = {
  onRegister: (form) => axios.post(api_path.register, form),
  getSession: () => axios.get(api_path.getSession),
  getLoginOTP: (form) => axios.post(api_path.loginOTP, form),
  onLogin: (form) => axios.post(api_path.login, form),
  forgotPassword: (form) => axios.post(api_path.forgotPassword, form),
  checkOtp: (form) => axios.post(api_path.checkOtp, form),
  resetPassword: (form) => axios.post(api_path.resetPassword, form),
}

export default AuthService
