import axios from '../config/axios'

const api_path = {
  register: '/register',
  registerOtp: '/register-otp',
  getSession: '/auth/session',
  checkUserExist: '/check-user',
  loginWithPhone: '/login-phone',
  loginOTP: '/login-otp',
  login: '/login',
  forgotPassword: '/forgot-password',
  checkOtp: '/check-otp',
  resetPassword: '/reset-password',
  loginWithAdmin: '/login-admin',
}

const AuthService = {
  onRegister: (form) => axios.post(api_path.register, form),

  getRegisterOTP: (form) => axios.post(api_path.registerOtp, form),

  getSession: () => axios.get(api_path.getSession),

  isUserExist: (form) => axios.post(api_path.checkUserExist, form),

  loginWithPhone: (form) => axios.post(api_path.loginWithPhone, form),

  getLoginOTP: (form) => axios.post(api_path.loginOTP, form),

  onLogin: (form) => axios.post(api_path.login, form),

  forgotPassword: (form) => axios.post(api_path.forgotPassword, form),

  checkOtp: (form) => axios.post(api_path.checkOtp, form),

  resetPassword: (form) => axios.post(api_path.resetPassword, form),

  onLoginWithAdmin: (form) => axios.post(api_path.loginWithAdmin, form),
}

export default AuthService
